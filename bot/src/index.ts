const dotenv = require('dotenv').config();
const { REST  } = require('@discordjs/rest');
const  { ButtonStyle, Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Routes, ActionRowBuilder, SelectMenuBuilder, ActivityType, ButtonBuilder  } = require('discord.js');
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
    await interaction.reply({ embeds: [pingEmbed] })
  }
});


const blueSquare = ":blue_square:"
const greenSquare = ":green_square:"
const blackSquare = ":black_large_square:"
const whiteSquare = ":white_large_square:"
const yellowSquare = ":yellow_square:"
const orangeSquare = ":orange_square:"
const redSquare = ":red_square:"

const rocketJSON = {
  name: "rocket1",
  parts: [
    // capsule
    {
      position: [1, 6], // x, y
      color: blackSquare
    },
    {
      position: [2, 5], // x, y
      color: blackSquare
    },
    {
      position: [2, 6], // x, y
      color: blackSquare
    },
    {
      position: [2, 7], // x, y
      color: blackSquare
    },
    // fuel tanks
    {
      position: [3, 5], // x, y
      color: whiteSquare
    },
    {
      position: [3, 6], // x, y
      color: whiteSquare
    },
    {
      position: [3, 7], // x, y
      color: whiteSquare
    },
    {
      position: [4, 5], // x, y
      color: whiteSquare
    },
    {
      position: [4, 6], // x, y
      color: whiteSquare
    },
    {
      position: [4, 7], // x, y
      color: whiteSquare
    },
    {
      position: [5, 5], // x, y
      color: whiteSquare
    },
    {
      position: [5, 6], // x, y
      color: whiteSquare
    },
    {
      position: [5, 7], // x, y
      color: whiteSquare
    },
    {
      position: [6, 5], // x, y
      color: whiteSquare
    },
    {
      position: [6, 6], // x, y
      color: whiteSquare
    },
    {
      position: [6, 7], // x, y
      color: whiteSquare
    },
    {
      position: [7, 5], // x, y
      color: whiteSquare
    },
    {
      position: [7, 6], // x, y
      color: whiteSquare
    },
    {
      position: [7, 7], // x, y
      color: whiteSquare
    },
    // engine
    {
      position: [8, 4], // x, y
      color: blackSquare
    },
    {
      position: [8, 6], // x, y
      color: blackSquare
    },
    {
      position: [8, 8], // x, y
      color: blackSquare
    },
    // fire 1
    {
      position: [9, 4], // x, y
      color: yellowSquare
    },
    {
      position: [9, 5], // x, y
      color: orangeSquare
    },
    {
      position: [9, 6], // x, y
      color: yellowSquare
    },
    {
      position: [9, 7], // x, y
      color: orangeSquare
    },
    {
      position: [9, 8], // x, y
      color: yellowSquare
    },
    // fire 2
    {
      position: [10, 5], // x, y
      color: redSquare
    },
    {
      position: [10, 6], // x, y
      color: orangeSquare
    },
    {
      position: [10, 7], // x, y
      color: redSquare
    },
  ]
}


client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "spawn") {
    let board = [] // create array of item
    let currentGrass: number = 4 // 4 default
    let currentSky: number = 12 - currentGrass
    
    for (let i=0; i < currentSky; i++) { // loop that will add sky squares to the array
      board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    
      if (i == (currentSky-1)) { // if its end on the loop
        for (let j=0; j < currentGrass; j++) { // loop that will add grass squares to the array
          board.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
          
          if (j >= (currentGrass-1)) { // if its end on the loop

            for (let num in rocketJSON.parts) {
              let xPos = rocketJSON.parts[num].position[0]
              let yPos = rocketJSON.parts[num].position[1]
              let blockColor = rocketJSON.parts[num].color
          
              board[xPos][yPos] = blockColor
            }

            const spawnEmbed = new EmbedBuilder() // Create embed
              .setTitle(`Rocket user @${interaction.user.username}`)
              .setDescription(board.toString().replace(/,/g,'')) //convert board to string and remove ","
              .setColor(`#${randomColor}`)
              .setTimestamp()

            await interaction.reply({ embeds: [spawnEmbed] }) // reply with embed
          }
        }
      }
    }
  }
});

client.login(token); 