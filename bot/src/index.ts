// imports
const dotenv = require('dotenv').config();
import { REST  } from '@discordjs/rest';
import {
	ButtonStyle, 
	Client, 
	GatewayIntentBits, 
	AttachmentBuilder, 
	EmbedBuilder, 
	Routes, 
	ActionRowBuilder, 
	SelectMenuBuilder, 
	ActivityType, 
	ButtonBuilder
} from 'discord.js';

// settings


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	]
});

// env informations
const envInformations = {
	clientID: process.env.client_ID,
	TOKEN: process.env.TOKEN,
	guildID: process.env.GUILD_ID
};

// rest
const restAPI = new REST({
	version: '10'
}).setToken(envInformations.TOKEN!);

// on ready
client.on('ready', () => {
	console.log('Discord bot is online');
});

// functions
const getColor = (): string => {
	const color = Math.floor(
		Math.random() * 16777215
	).toString(16);
	
	return `${color}`;
};

const delay = (ms: number) => {
	return new Promise(res => setTimeout(res, ms));
}

// discord bot commands
const commandsArray = [
	{
		name: 'ping',
		description: 'get response time'
	},
	{
		name: 'play',
		description: 'play game'
	}
];

(async () => {
	try {
		await restAPI.put(
			Routes.applicationGuildCommands(
				envInformations.clientID!, 
				envInformations.guildID!
			),
			{
				body: commandsArray
			},
		)
	} catch (err: any) {
		console.log(err);
	}
})();

// commands

// ping command
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;
	
	if (interaction.commandName == 'ping') {
		const pingEmbed = new EmbedBuilder()
			.setTitle(`Response time is: ${ Date.now() - interaction.createdTimestamp}ms`)
			.setColor(`#${getColor()}`)
			.setTimestamp()
		await interaction.reply({ embeds: [pingEmbed] })
	}
});


// rocket
const block = {
	blue: ':blue_square:',
	green: ':green_square:',
	black: ':black_large_square:',
	white: ':white_large_square:',
	yellow: ':yellow_square:',
	orange: ':orange_square:',
	red: ':red_square:',
	purple: ':purple_square:',
	whiteBlack: ':white_square_button:',
};

let cloudPoisition: number[][] = [];
let currentGround = 4;
let currentSky = 12 - currentGround;

let currentWorld: string[][] = [[], [], [], [], [], [], [], [], [], [], [], []];

let velocity = 700; // ms

// builders
const positionButton = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('moveLeft')
		.setLabel('Left')
		.setStyle(ButtonStyle.Primary),
	new ButtonBuilder()
		.setCustomId('moveRight')
		.setLabel('Right')
		.setStyle(ButtonStyle.Primary)
)

const startButton = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('playGame')
			.setLabel('Play')
			.setStyle(ButtonStyle.Success),
)

// uilts
const getWorld = () => {
	// currentWorld = [[], [], [], [], [], [], [], [], [], [], [], []];
	// sky
	for (let i=0; i <currentSky; i++) {
		for (let j=0; j < 13; j++) {
			currentWorld[i][j] = block.blue;
		}
		currentWorld[i][14] = '\n';
	}
	
	// ground
	for (let k=currentSky; k < (currentSky + currentGround); k++) {
		for (let l=0; l < 13; l++) {
			currentWorld[k][l] = block.green;
		}
		currentWorld[k][14] = '\n';
	}
}


// slash commands
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;
	
	if (interaction.commandName == 'play') {
		getWorld();
		
		const spawnEmbed = new EmbedBuilder()
			.setTitle(`Rocket`)
			.setDescription(currentWorld.join('').replace(/,/g, ''))
			.setColor(`#${getColor()}`)
			.setTimestamp()
			.setFooter({ text:`Response time is: ${Date.now() - interaction.createdTimestamp}ms` })
		
		await interaction.reply({
			embeds: [spawnEmbed],
			components: [startButton]
		});
	}
});


// button commands
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isButton()) return;
	if (interaction.customId == 'playGame') {
		getWorld();
		
		const spawnEmbed = new EmbedBuilder()
			.setTitle(`Rocket`)
			.setDescription(currentWorld.join('').replace(/,/g, ''))
			.setColor(`#${getColor()}`)
			.setTimestamp()
			.setFooter({ text:`Response time is: ${Date.now() - interaction.createdTimestamp}ms` })
		
		await interaction.reply({
			embeds: [spawnEmbed],
			components: [positionButton]
		});
	}
})


client.login(envInformations.TOKEN);
