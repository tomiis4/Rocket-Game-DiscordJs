const dotenv = require('dotenv').config();
const { REST  } = require('@discordjs/rest');
const  { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Routes, ActionRowBuilder, SelectMenuBuilder, ActivityType  } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});


const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const rest = new REST({ version: '10' }).setToken(token);

const randomColor = Math.floor(Math.random()*16777215).toString(16);

client.on("ready", () => {
    console.log(`[DISCORD] ${client.user.username} has been online`);
})

const commands = [
  {
    name: 'ping',
    description: 'ping command will respond with response time.'
  },
  {
    name: 'spawn',
    description: 'spawn command will respond with board.'
  }
];


// Spawn commands
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
    console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();



// Ping command
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "ping") {
    const pingEmbed = new EmbedBuilder() // Create embed
    .setTitle(`Response time is: ${ Date.now() - interaction.createdTimestamp}ms`)
    .setColor(`#${randomColor}`)
    .setTimestamp()
    interaction.reply({ embeds: [pingEmbed] })
  }
});

// Spawn command
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "spawn") {
    const pingEmbed = new EmbedBuilder() // Create embed
    .setTitle(`Boar user @${interaction.user.username}`)
    .setDescription(':blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:\n:green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:\n:green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:\n:green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:\n:green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:')
    .setColor(`#${randomColor}`)
    .setTimestamp()
    interaction.reply({ embeds: [pingEmbed] })
  }
});

client.login(token);

