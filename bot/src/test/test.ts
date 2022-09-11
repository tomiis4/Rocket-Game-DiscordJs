const dotenv = require('dotenv').config();
// const { REST  } = require('@discordjs/rest');
// const  { ButtonStyle, Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Routes, ActionRowBuilder, SelectMenuBuilder, ActivityType, ButtonBuilder  } = require('discord.js');
// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//   ]
// });

// const clientId = process.env.CLIENT_ID;
// const token = process.env.TOKEN;
// const guildId = process.env.GUILD_ID;
// const rest = new REST({ version: '10' }).setToken(token);

// const randomColor = Math.floor(Math.random()*16777215).toString(16);
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// client.on("ready", () => {
//     console.log(`[DISCORD] ${client.user.username} has been online`);
// })


// const commands = [
//   {
//     name: 'ping',
//     description: 'ping command will respond with response time.'
//   },
//   {
//     name: 'spawn',
//     description: 'spawn command will respond with board.'
//   }
// ];
// // Spawn commands
// (async () => {
// 	try {
// 		await rest.put(
// 			Routes.applicationGuildCommands(clientId, guildId),
// 			{ body: commands },
// 		);
//     console.log('Successfully reloaded application (/) commands.');
// 	} catch (err) {
// 		console.error(err);
// 	}
// })();


// // Ping command
// client.on('interactionCreate', async (interaction: any) => {
//   if (!interaction.isChatInputCommand()) return;
//   if (interaction.commandName == "ping") {
//     const pingEmbed = new EmbedBuilder() // Create embed
//       .setTitle(`Response time is: ${ Date.now() - interaction.createdTimestamp}ms`)
//       .setColor(`#${randomColor}`)
//       .setTimestamp()
//     await interaction.reply({ embeds: [pingEmbed] })
//   }
// });


// // Variables
// const blueSquare = ":blue_square:"
// const greenSquare = ":green_square:"
// const blackSquare = ":black_large_square:"
// const whiteSquare = ":white_large_square:"
// const yellowSquare = ":yellow_square:"
// const orangeSquare = ":orange_square:"
// const redSquare = ":red_square:"
// const purpleSquare = ":purple_square:"

// let board: any[] = [] // create array of item
// var currentGrass: number = 4
// var currentSky: number = 12 - currentGrass

// const rocketJSON = {
//   name: "rocket1",
//   parts: [
//     // capsule
//     {
//       position: [1, 6], // x, y
//       color: blackSquare
//     },
//     {
//       position: [2, 5], // x, y
//       color: blackSquare
//     },
//     {
//       position: [2, 6], // x, y
//       color: blackSquare
//     },
//     {
//       position: [2, 7], // x, y
//       color: blackSquare
//     },
//     // fuel tanks
//     {
//       position: [3, 5], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [3, 6], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [3, 7], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [4, 5], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [4, 6], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [4, 7], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [5, 5], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [5, 6], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [5, 7], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [6, 5], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [6, 6], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [6, 7], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [7, 5], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [7, 6], // x, y
//       color: whiteSquare
//     },
//     {
//       position: [7, 7], // x, y
//       color: whiteSquare
//     },
//     // engine
//     {
//       position: [8, 4], // x, y
//       color: blackSquare
//     },
//     {
//       position: [8, 6], // x, y
//       color: blackSquare
//     },
//     {
//       position: [8, 8], // x, y
//       color: blackSquare
//     },
//     // fire 1
//     {
//       position: [9, 4], // x, y
//       color: yellowSquare
//     },
//     {
//       position: [9, 5], // x, y
//       color: orangeSquare
//     },
//     {
//       position: [9, 6], // x, y
//       color: yellowSquare
//     },
//     {
//       position: [9, 7], // x, y
//       color: orangeSquare
//     },
//     {
//       position: [9, 8], // x, y
//       color: yellowSquare
//     },
//     // fire 2
//     {
//       position: [10, 5], // x, y
//       color: redSquare
//     },
//     {
//       position: [10, 6], // x, y
//       color: orangeSquare
//     },
//     {
//       position: [10, 7], // x, y
//       color: redSquare
//     },
//   ]
// }

// const moveButton = new ActionRowBuilder()
//   .addComponents(
//     new ButtonBuilder()
//       .setCustomId('btnLeft')
//       .setLabel('Left')
//       .setStyle(ButtonStyle.Primary),
//     new ButtonBuilder()
//       .setCustomId('btnRight')
//       .setLabel('Right')
//       .setStyle(ButtonStyle.Primary),
// );
// const startButton = new ActionRowBuilder()
//   .addComponents(
//     new ButtonBuilder()
//       .setCustomId('startFly')
//       .setLabel('Start')
//       .setStyle(ButtonStyle.Success),
// );

// const resetBoard = () => {
//   board = []

//   for (let i=0; i < currentSky; i++) { // loop that will add sky squares to the array
//     board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    
//     if (i == (currentSky-1)) { // if its end on the loop
//       for (let j=0; j < currentGrass; j++) { // loop that will add grass squares to the array
//         board.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
//       }
//     }
//   }
// }

// const spawnSky = () => {
//   board = []

//   for (let i=0; i < 12; i++) {
//     board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
//   }
// }


// //  Board Command
// client.on('interactionCreate', async (interaction: any) => {
//   if (!interaction.isChatInputCommand()) return;
//   if (interaction.commandName == "spawn") {
//     board = []

//     for (let i=0; i < currentSky; i++) { // loop that will add sky squares to the array
//       board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
    
//       if (i == (currentSky-1)) { // if its end on the loop
//         for (let j=0; j < currentGrass; j++) { // loop that will add grass squares to the array
//           board.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
          
//           if (j >= (currentGrass-1)) { // if its end on the loop

//             for (let num in rocketJSON.parts) { // loop trough rocket parts
//               let xPos = rocketJSON.parts[num].position[0]
//               let yPos = rocketJSON.parts[num].position[1]
//               let blockColor = rocketJSON.parts[num].color
          
//               board[xPos][yPos] = blockColor
//             }

//             const spawnEmbed = new EmbedBuilder() // Create embed
//               .setTitle(`Rocket by user @${interaction.user.username}`)
//               .setDescription(board.toString().replace(/,/g,'')) //convert board to string and remove ","
//               .setColor(`#${randomColor}`)
//               .setTimestamp()
//               .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` })

//             await interaction.reply({ embeds: [spawnEmbed], components: [startButton] }) // reply with embed
//           }
//         }
//       }
//     }
//   }
// });


// // Move button command
// client.on('interactionCreate', async (interaction: any) => {
// 	if (!interaction.isButton()) return;
// 	if (interaction.customId == "btnLeft") { // if left button is pressed
//     spawnSky()

//     for (let num in rocketJSON.parts) { // loop trough rocket parts
//       rocketJSON.parts[num].position[1] -= 1
//       let xPos = rocketJSON.parts[num].position[0]
//       let yPos = rocketJSON.parts[num].position[1]
//       let blockColor = rocketJSON.parts[num].color
      
//       board[xPos][yPos] = blockColor
//     }
//     const spawnEmbed = new EmbedBuilder() // Create embed
//       .setTitle(`Rocket by user @${interaction.user.username}`)
//       .setDescription(board.toString().replace(/,/g,'')) //convert board to string and remove ","
//       .setColor(`#${randomColor}`)
//       .setTimestamp()
//       .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` })

//     await interaction.deferUpdate()
//     await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) // reply with embed
//   }

// 	if (interaction.customId == "btnRight") { // if right button is pressed
//     spawnSky()

//     for (let num in rocketJSON.parts) { // loop trough rocket parts
//       rocketJSON.parts[num].position[1] += 1
//       let xPos = rocketJSON.parts[num].position[0]
//       let yPos = rocketJSON.parts[num].position[1]
//       let blockColor = rocketJSON.parts[num].color

//       board[xPos][yPos] = blockColor
//     }
//     const spawnEmbed = new EmbedBuilder() // Create embed
//       .setTitle(`Rocket by user @${interaction.user.username}`)
//       .setDescription(board.toString().replace(/,/g,'')) //convert board to string and remove ","
//       .setColor(`#${randomColor}`)
//       .setTimestamp()
//       .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` })

//     await interaction.deferUpdate()
//     await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) // reply with embed
//   }
// })

// // Start button command
// client.on('interactionCreate', async (interaction: any) => {
// 	if (!interaction.isButton()) return;

//   const rocketFly = async () => {
//     for (let grassNum=4; grassNum >= 1; grassNum -= 1) {
//       let grassNumX = grassNum
//       let skyNumX = 12 - grassNumX
//       board = []

//       // generate background
//       for (let i=0; i < skyNumX; i++) { 
//         board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
        
//         if (i == (skyNumX-1)) { // if its end on the loop
//           for (let j=0; j < grassNumX; j++) { // loop that will add grass squares to the array
//             board.push([greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare, greenSquare,"\n"])
//           }
//         }
//       }

//       if (grassNum <= 1) {
//         await delay(800)
//         board = []

//         for (let i=0; i < 12; i++) {
//           board.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
//         }
//       }

//       // generate rocket
//       for (let num in rocketJSON.parts) {
//         let xPos = rocketJSON.parts[num].position[0]
//         let yPos = rocketJSON.parts[num].position[1]
//         let blockColor = rocketJSON.parts[num].color
    
//         board[xPos][yPos] = blockColor // spawn rocket
//       }
      
//       const spawnEmbed = new EmbedBuilder() // Create embed
//         .setTitle(`Rocket by user @${interaction.user.username}`)
//         .setDescription(board.toString().replace(/,/g,'')) //convert board to string and remove ","
//         .setColor(`#${randomColor}`)
//         .setTimestamp()
//         .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` })

//       await interaction.editReply({ embeds: [spawnEmbed], components: [moveButton] }) 
//       await delay(800)
//     }
//   }

// 	if (interaction.customId == "startFly") { // if start button is pressed
//     await interaction.deferUpdate()
//     rocketFly()
//   }
// })

// client.login(token); 





















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

let currentWorld: any[] = []
let displayWorld: any[] = currentWorld.slice()  

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

//! S

const getRandomClouds = () => {
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
const appendClouds = () => {
  for (let cloudNumber in clouds) {
    let cloudX1 = clouds[cloudNumber][0]
    let cloudX2 = clouds[cloudNumber][1]
    let cloudY = clouds[cloudNumber][2]

    currentWorld[cloudY][cloudX1] = purpleSquare
    currentWorld[cloudY][cloudX2] = purpleSquare
  }
}
const getRocket = () => {
  for (let num in rocketJSON.parts) {
    let xPosition = rocketJSON.parts[num].position[0]
    let yPosition = rocketJSON.parts[num].position[1]
    let blockColor = rocketJSON.parts[num].color

    currentRocket.push([xPosition, yPosition, blockColor])
  }
}
const appendWorld = () => {  
  currentWorld = []
  getWorld()
  appendClouds()
  displayWorld = currentWorld.slice()  

  for (let number in currentRocket) {
    let partX = currentRocket[number][0]
    let partY = currentRocket[number][1]
    let partColor = currentRocket[number][2]
    
    displayWorld[partX][partY] = partColor
  }
}

getRandomClouds()
getRocket()
appendWorld()

//TODO move right
const moveRocketLeft = () => {
  for (let number in currentRocket) {
    currentRocket[number][1] -= 2 
  }
  appendWorld()
}
moveRocketLeft()

const flyRocket = () => {
  currentWorld = []
  let currentGroundFly = 2
  let currentSkyFly = 12 - currentGroundFly

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
    clouds[number][2] -= 1
  }
  appendClouds()

  for (let number in currentRocket) {
    let partX = currentRocket[number][0]
    let partY = currentRocket[number][1]
    let partColor = currentRocket[number][2]
    
    displayWorld[partX][partY] = partColor
  }
}

flyRocket()

console.log(displayWorld.toString().replace(/,/g,''))