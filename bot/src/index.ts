const dotenv = require('dotenv').config();
const { REST  } = require('@discordjs/rest');
const  { ButtonStyle, Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Routes, ActionRowBuilder, SelectMenuBuilder, ActivityType, ButtonBuilder  } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

// get informations from .env
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(token);

const randomColor = Math.floor(Math.random()*16777215).toString(16);
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// activate when discord bot is online
client.on("ready", () => {
  console.log(`[DISCORD] ${client.user.username} has been online`);
})

// store every command
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
// Activate each command.
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
    console.log('Successfully reloaded application (/) commands.');
	} catch (err) {
		console.error(err);
	}
})();


// Ping command
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  
  // if command is /ping
  if (interaction.commandName == "ping") {
    const pingEmbed = new EmbedBuilder()
      .setTitle(`Response time is: ${ Date.now() - interaction.createdTimestamp}ms`)
      .setColor(`#${randomColor}`)
      .setTimestamp()
    await interaction.reply({ embeds: [pingEmbed] })
  }
});


//? Variables
const blueSquare = ":blue_square:"
const greenSquare = ":green_square:"
const blackSquare = ":black_large_square:"
const whiteSquare = ":white_large_square:"
const yellowSquare = ":yellow_square:"
const orangeSquare = ":orange_square:"
const redSquare = ":red_square:"
const purpleSquare = ":purple_square:"

let clouds: any[] = []
let currentGround = 4;
let currentSky = 12 - currentGround;

let currentHeight: number = 0

let currentPurpleSize: number = 0

let currentWorld: any[] = []
let displayWorld: any[] = currentWorld.slice()  

const rocketSpeed = 700
let currentRocket: any[] = []
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

// Buttons
const moveButton = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('btnLeft')
      .setLabel('Left')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('btnRight')
      .setLabel('Right')
      .setStyle(ButtonStyle.Primary),
)
const startButton = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('startFly')
      .setLabel('Start')
      .setStyle(ButtonStyle.Success),
)

//Functions for rocket fly/move
const getRandomClouds = () => {
  // generate 5 clouds
  for (let i=0; i<5; i++) {
    let randomX = (Math.floor(Math.random() * 13) + 1)
    let randomY = (Math.floor(Math.random() * 7) + 1)
    clouds.push([randomX, randomX + 1, randomY])
  }
}
const getWorld = () => {
  currentWorld = []

  for (let i=0; i < currentSky; i++) {
    currentWorld.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    
    if (i == (currentSky-1)) {
      for (let j=0; j < currentGround; j++) {
        currentWorld.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
      }
    }
  }
}
//! const appendClouds = () => {
//   // for each cloud in array append to the world
//   for (let cloudNumber in clouds) {
//     let cloudX1 = clouds[cloudNumber][0]
//     let cloudX2 = clouds[cloudNumber][1]
//     let cloudY = clouds[cloudNumber][2]

//     currentWorld[cloudY][cloudX1] = purpleSquare
//     currentWorld[cloudY][cloudX2] = purpleSquare
//   }
//! }
const getRocket = () => {
  for (let num in rocketJSON.parts) {
    let xPosition = rocketJSON.parts[num].position[0]
    let yPosition = rocketJSON.parts[num].position[1]
    let blockColor = rocketJSON.parts[num].color

    currentRocket.push([xPosition, yPosition, blockColor])
  }
}
const appendWorld = async () => {  
  currentWorld = []
  getWorld()
  
  // duplicate world array
  displayWorld = currentWorld.slice() 

  // append rocket
  for (let number in currentRocket) {
    let partX = currentRocket[number][0]
    let partY = currentRocket[number][1]
    let partColor = currentRocket[number][2]
    
    displayWorld[partX][partY] = partColor
  }
}
const flyRocket = (moveClouds: number, groundSize: number) => {
  currentWorld = []

  let currentGroundFly = groundSize
  currentGround = groundSize
  let currentSkyFly = 12 - currentGroundFly

  //change sky & ground
  for (let i=0; i < currentSkyFly; i++) {
    currentWorld.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    
    if (i == (currentSkyFly-1)) {
      for (let j=0; j < currentGroundFly; j++) {
        currentWorld.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
      }
    }
  }

  displayWorld = currentWorld.slice() 

  for (let number in clouds) {
    clouds[number][2] -= moveClouds
  }
  // appendClouds()

  for (let number in currentRocket) {
    let partX = currentRocket[number][0]
    let partY = currentRocket[number][1]
    let partColor = currentRocket[number][2]
    
    displayWorld[partX][partY] = partColor
  }
}
const spawnSpace = async () => {
  displayWorld = []

  // if its not current space
  if (currentPurpleSize > 0) {
    // change from sky to space
    for (let i=0; i < currentPurpleSize; i++) {
      displayWorld.push([purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare,"\n"])
    
      if (i == currentPurpleSize -1) {
        for (let j=0; j < (12-currentPurpleSize); j++) {
          displayWorld.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
        }
      }
    }
  } 
  
  // generate full sky
  else if (currentPurpleSize == 0) {
    for (let x=0; x < 12; x++) {
      displayWorld.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    }
  }

  for (let number in currentRocket) {
    let partX = currentRocket[number][0]
    let partY = currentRocket[number][1]
    let partColor = currentRocket[number][2]
    
    displayWorld[partX][partY] = partColor
  }
}


//  World Command
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "spawn") {
    getRandomClouds()
    getRocket()
    appendWorld()

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Height: ${currentHeight}`)
      .setDescription(displayWorld.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res.
    
    await interaction.reply({ embeds: [spawnEmbed], components: [startButton] }) // reply with embed
  }
});

//TODO Add clouds
// Start button command
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isButton()) return;
	if (interaction.customId == "startFly") { // if start button is pressed
    await interaction.deferUpdate()
    
    // launch rocket from ground
    for (let i=4; i >= 0; i -= 1) {
      flyRocket(i, i)
      let currentDots: any[] = []
      currentDots.push(i)

      const spawnEmbed = new EmbedBuilder() // Create embed
        .setTitle(`Ground: ${currentDots.toString().replace(/,/g,'')}`)
        .setDescription(displayWorld.toString().replace(/,/g,'').replace(/0/g,'.').replace(/1/g,'.').replace(/2/g,'.').replace(/3/g,'.').replace(/4/g,'.')) //convert board to string and remove ","
        .setColor(`#${randomColor}`)
        .setTimestamp()
        .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time
        
      await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) 
      await delay(rocketSpeed)
    }
    
    // fly rocket from sky to space
    for (currentHeight =0; currentHeight < 12; currentHeight++ ) {
      while (currentPurpleSize <= 12) {
        displayWorld = []
        spawnSpace()
        
        const spawnEmbed = new EmbedBuilder() // Create embed
          .setTitle(`Height: ${currentHeight}`)
          .setDescription(displayWorld.toString().replace(/,/g,'')) //convert board to string and remove ","
          .setColor(`#${randomColor}`)
          .setTimestamp()
          .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time
        await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) // reply with embed
        
        currentPurpleSize++
        currentHeight++
        await delay(rocketSpeed)
      }
    }
  }
})

// Move button command
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isButton()) return;
  
  // if left button is pressed
	if (interaction.customId == "btnLeft") { 
    // change every part Y position to -=1
    const moveRocketLeft = () => {
      for (let number in currentRocket) {
        currentRocket[number][1] -= 1
      }

      for (let number in currentRocket) {
        let partX = currentRocket[number][0]
        let partY = currentRocket[number][1]
        let partColor = currentRocket[number][2]
        
        displayWorld[partX][partY] = partColor
      }
    }
    moveRocketLeft()

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Height: ${currentHeight}`)
      .setDescription(displayWorld.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) // reply with embed
  }

  // if right button is pressed
	if (interaction.customId == "btnRight") { 
    // change every part Y position to -=1
    const moveRocketRight = () => {
      for (let number in currentRocket) {
        currentRocket[number][1] += 1
      }

      for (let number in currentRocket) {
        let partX = currentRocket[number][0]
        let partY = currentRocket[number][1]
        let partColor = currentRocket[number][2]
        
        displayWorld[partX][partY] = partColor
      }
    }
    moveRocketRight()

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Height: ${currentHeight}`)
      .setDescription(displayWorld.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) // reply with embed
  }
})

client.login(token); 