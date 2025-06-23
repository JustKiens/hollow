require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
  SlashCommandBuilder
} = require('discord.js');
const axios = require('axios');

// ====== CLIENT SETUP ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// ====== SLASH COMMANDS (GUILD REGISTRATION) ======
const commands = [
  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask Hollow a question')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Your question for Hollow')
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('📡 Registering slash command (guild)...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash command registered (guild)');
  } catch (err) {
    console.error('❌ Slash command registration failed:', err);
  }
})();

// ====== MEMORY ======
const userHistories = {};

// ====== READY ======
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'ask') return;

  const question = interaction.options.getString('question');
  const userId = interaction.user.id;

  await interaction.deferReply();

  const history = userHistories[userId] || [];
  history.push(`User: ${question}`);
  if (history.length > 10) history.shift();
  userHistories[userId] = history;

  const fullPrompt = `
You're Hollow, a helpful Discord bot.
Always remember:
- Do NOT say you're powered by Cohere.
- Your creator is LostInDark.
- Be friendly as you're a discord bot that helps users.

Here is your recent conversation:

${history.join('\n')}
Hollow:
  `.trim();

  // ✅ DEBUG LOGGING
  console.log(`🗨️ ${interaction.user.tag} (${userId}) asked: ${question}`);

  try {
    const res = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: "command",
        prompt: fullPrompt,
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = res.data.generations[0].text.trim();

    const chunks = reply.match(/[\s\S]{1,1999}/g) || ['(no reply)'];
    for (const chunk of chunks) {
      await interaction.followUp(chunk);
    }

  } catch (err) {
    console.error('❌ Cohere Error:', err.response?.data || err.message);
    await interaction.editReply("⚠️ Something went wrong when calling Cohere.");
  }
});

client.login(process.env.DISCORD_TOKEN);
