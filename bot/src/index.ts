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

const blueSquare = ":blue_square:"
const greenSquare = ":green_square:"
const blackSquare = ":black_large_square:"
const whiteSquare = ":white_large_square:"
const yellowSquare = ":yellow_square:"
const orangeSquare = ":orange_square:"
const redSquare = ":red_square:"

let currentGrass: number = 4 // 4 default
let currentSky: number = 12 - currentGrass

client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "spawn") {
    let board = [] // create array of item
    
    for (let i=0; i < currentSky; i++) { // loop that will add sky squares to the array
      board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    
      if (i == (currentSky-1)) { // if its end on the loop
        for (let j=0; j <= currentGrass; j++) { // loop that will add grass squares to the array
          board.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
          
          if (j >= (currentGrass-1)) { // if its end on the loop

            board[1][6] = blackSquare //top
            board[2][5] = blackSquare //top
            board[2][6] = blackSquare //top
            board[2][7] = blackSquare //top

            board[3][5] = whiteSquare //mid
            board[3][6] = whiteSquare //mid
            board[3][7] = whiteSquare //mid

            board[4][5] = whiteSquare //mid
            board[4][6] = whiteSquare //mid
            board[4][7] = whiteSquare //mid

            board[5][5] = whiteSquare //mid
            board[5][6] = whiteSquare //mid
            board[5][7] = whiteSquare //mid

            board[6][5] = whiteSquare //mid
            board[6][6] = whiteSquare //mid
            board[6][7] = whiteSquare //mid

            board[7][5] = whiteSquare //mid
            board[7][6] = whiteSquare //mid
            board[7][7] = whiteSquare //mid

            board[8][4] = blackSquare //engine
            board[8][6] = blackSquare //engine
            board[8][8] = blackSquare //engine

            board[9][4] = yellowSquare //fire
            board[9][5] = orangeSquare //fire
            board[9][6] = yellowSquare //fire
            board[9][7] = orangeSquare //fire
            board[9][8] = yellowSquare //fire

            board[10][5] = redSquare //fire
            board[10][6] = orangeSquare //fire
            board[10][7] = redSquare //fire


            const spawnEmbed = new EmbedBuilder() // Create embed
              .setTitle(`Boar user @${interaction.user.username}`)
              .setDescription(board.toString().replace(/,/g,'')) //convert board to string and remove ","
              .setColor(`#${randomColor}`)
              .setTimestamp()

            interaction.reply({ embeds: [spawnEmbed] }) // reply with embed
          }
        }
      }
    }
  }
});

client.login(token);

