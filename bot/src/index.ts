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
  },
  {
    name: 'create',
    description: 'create command will allow you to create own rocket!'
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
const whiteBlackSquare = ":white_square_button:"

let clouds: any[] = []
let currentGround = 4;
let currentSky = 12 - currentGround;

let currentHeight: number = 0
let currentPurpleSize: number = 0

let currentWorld: any[] = []
let displayWorld: any[] = currentWorld.slice()  

const rocketSpeed = 700
let currentRocket: any[] = []

//? tom4sko rocket
const tom4skoRocket = [{ position: [6,2],  color: blackSquare }, { position: [6,3],  color: blackSquare }, { position: [5,3],  color: blackSquare }, { position: [7,3],  color: blackSquare }, { position: [7,4],  color: whiteSquare  }, { position: [5,4],  color: whiteSquare  }, { position: [6,4],  color: whiteBlackSquare  }, { position: [7,6],  color: whiteSquare  }, { position: [5,6],  color: whiteSquare  }, { position: [6,6],  color: whiteBlackSquare  }, { position: [7,5],  color: whiteSquare  }, { position: [5,5],  color: whiteSquare  }, { position: [6,5],  color: whiteSquare  }, { position: [7,7],  color: whiteSquare  }, { position: [5,7],  color: whiteSquare  }, { position: [6,7],  color: whiteSquare  }, { position: [4,8],  color: blackSquare  }, { position: [5,8],  color: blackSquare  }, { position: [7,8],  color: blackSquare  }, { position: [8,8],  color: blackSquare  }, { position: [4,9],  color: blackSquare  }, { position: [8,9],  color: blackSquare  }]

let rocketJSON: any = {
  name: "rocket1",
  parts: tom4skoRocket
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
const getRandomClouds = () => {
  // generate 5 clouds
  for (let i=0; i<5; i++) {
    let randomX = (Math.floor(Math.random() * 11))
    let randomY = (Math.floor(Math.random() * 11))
    clouds.push([randomX, randomX += 1, randomY])
  }
}
const appendClouds = () => {
  // for each cloud in array append to the world
  for (let cloudNumber in clouds) {
    let cloudX1Append = clouds[cloudNumber][0]
    let cloudX2Append = clouds[cloudNumber][1]
    let cloudYAppend = clouds[cloudNumber][2]

    // if exist
    if (displayWorld[cloudYAppend][cloudX1Append]) {
      // if is background blue
      if (displayWorld[cloudYAppend][cloudX1Append] == blueSquare) {
        displayWorld[cloudYAppend][cloudX1Append] = purpleSquare
        displayWorld[cloudYAppend][cloudX2Append] = purpleSquare
      } 
      // if its green => return green
      else if (displayWorld[cloudYAppend][cloudX1Append] == greenSquare){
        displayWorld[cloudYAppend][cloudX1Append] = greenSquare
        displayWorld[cloudYAppend][cloudX2Append] = greenSquare
      }
      // its its space
      else if (displayWorld[cloudYAppend][cloudX1Append] == purpleSquare){
        displayWorld[cloudYAppend][cloudX1Append] = blueSquare
        displayWorld[cloudYAppend][cloudX2Append] = blueSquare
      } else {
        console.error("Someting went wrong.")
      }
    } else {
      console.log(`Cloud ${cloudYAppend} & Cloud ${cloudX1Append} does not exist`)
    }
  }
}

const getRocket = () => {
  for (let num in rocketJSON.parts) {
    let xPosition = rocketJSON.parts[num].position[1]
    let yPosition = rocketJSON.parts[num].position[0]
    let blockColor = rocketJSON.parts[num].color

    currentRocket.push([xPosition, yPosition, blockColor])
  }
}
const spawnRocket = () => {
  for (let number in currentRocket) {
    let partX = currentRocket[number][0]
    let partY = currentRocket[number][1]
    let partColor = currentRocket[number][2]
    
    displayWorld[partX][partY] = partColor
  }
}

const appendWorld = async () => {  
  currentWorld = []
  getWorld()
  
  // duplicate world array
  displayWorld = currentWorld.slice() 

  // append clouds
  appendClouds()

  // append rocket
  spawnRocket()
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

  //! move clouds & append
  // for (let number in clouds) {
  //   clouds[number][2] -= moveClouds
  // }
  appendClouds()

  // append rocket
  spawnRocket()
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

  spawnRocket()
}

const spawnFullSpace = () => {
  displayWorld = []
  
  // generate space
  for (let i=0; i < 12; i++) {
    displayWorld.push([purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare, purpleSquare,"\n"])
  }
}

//  World Command
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "spawn") {
    clouds= []
    currentGround = 4;
    currentSky = 12 - currentGround;
    currentHeight = 0
    currentPurpleSize = 0
    currentWorld = []
    displayWorld = currentWorld.slice()  
    currentRocket = []

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

//TODO Fix clouds
// Start button command (run)
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
        appendClouds()
        
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

        // launching in space
        if (currentPurpleSize == 12) {
          while (currentPurpleSize <= 25) {
            spawnFullSpace()

            //! append moon
            
            spawnRocket()

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
    }
  }
})

// MoveX button command
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


//? Variables
let itemPositionBuild: any[] = []
let itemTypeBuild: any[] = []

let createRocketBlueprin: any[] = []

// buttons & sellect menu
const moveButtonBuild = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder() // place button
      .setCustomId('placeObjectBuild')
      .setLabel('Place')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder() // left button
      .setCustomId('leftBuild')
      .setLabel('Left')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder() // right button
      .setCustomId('rightBuild')
      .setLabel('Right')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder() // top button
      .setCustomId('topBuild')
      .setLabel('Top')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder() // bottom button
      .setCustomId('bottomBuild')
      .setLabel('Bottom')
      .setStyle(ButtonStyle.Primary),
  )
const selectItemBuild = new ActionRowBuilder()
  .addComponents(
    new SelectMenuBuilder() // select block
      .setCustomId('selectBlock')
      .setPlaceholder('Nothing is selected')
      .addOptions(
        {
          label: `Capsule`,
          description: 'Add capsule to your rocket.',
          value: 'addCapsule',
        },
        {
          label: `Window`,
          description: 'Add window to your rocket.',
          value: 'addWindow',
        },
        {
          label: `Fuel`,
          description: 'Add fuel to your rocket.',
          value: 'addFuel',
        },
        {
          label: `Engine`,
          description: 'Add engine to your rocket.',
          value: 'addEngine',
        },
      ),
  )

// secondary functions
const colorCheck = (item: string) => {
  // check what item is what color
  if (item == "addCapsule") {
    return blackSquare
  }
  else if (item == "addWindow") {
    return whiteBlackSquare
  }
  else if (item == "addFuel") {
    return whiteSquare
  }
  else if (item == "addEngine") {
    return blackSquare
  }
}

// Main functions
const generateJSON = () => {
  // loop trough items from JSON to the blueprint
  for (let num in rocketJSON.parts) {
    let xPosition = rocketJSON.parts[num].position[0]
    let yPosition = rocketJSON.parts[num].position[1]
    let blockColor = rocketJSON.parts[num].color
    
    createRocketBlueprin[yPosition][xPosition] = blockColor
  }
}
const createBlueprint = () => {
  createRocketBlueprin = []

  for (let i=0; i < 12; i++) {
    createRocketBlueprin.push([blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare, blueSquare,"\n"])
  }
  generateJSON()
}
const createBlock = (itemName: string) => {
  // add block to the blueprint
  createBlueprint()

  itemPositionBuild = [0,0]
  itemTypeBuild = [colorCheck(itemName), itemName]

  createRocketBlueprin[itemPositionBuild[1]][itemPositionBuild[0]] = itemTypeBuild[0]
}
const placeBlock = () => {
  // push object to the JSON & rese current item
  rocketJSON.parts.push({
    position: itemPositionBuild,
    color: itemTypeBuild[0]
  })

  itemPositionBuild = [0,0]
  itemTypeBuild = []
}
const moveBlockX = (xPosition: number) => {
  createBlueprint()

  itemPositionBuild[0] += xPosition
  createRocketBlueprin[itemPositionBuild[1]][itemPositionBuild[0]] = itemTypeBuild[0]
}
const moveBlockY = (yPosition: number) => {
  createBlueprint()

  itemPositionBuild[1] += yPosition
  createRocketBlueprin[itemPositionBuild[1]][itemPositionBuild[0]] = itemTypeBuild[0]
}

// Create rocket command
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;
  // reset every variable 
  itemPositionBuild = []
  itemTypeBuild = []
  createRocketBlueprin = []
  rocketJSON = {
    name: interaction.user.username,
    parts: []
  }

  // if create command was activated
	if (interaction.commandName == "create") { 
    createBlueprint()

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

  await interaction.reply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }
})

// Add item command
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isSelectMenu()) return;
  
  // if sometinh was selected in the sellect menu
	if (interaction != undefined) { 
    createBlock(interaction.values)

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }
})

// Rocket buttons command
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isButton()) return;
  
  // if place button is pressed
	if (interaction.customId == "placeObjectBuild") { 
    placeBlock()

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }

  // if left button was pressed
	else if (interaction.customId == "leftBuild" && itemPositionBuild[0] > 0) { 
    moveBlockX(-1)

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }

  // if right button was pressed
	else if (interaction.customId == "rightBuild" && itemPositionBuild[0] < 12) { 
    moveBlockX(1)

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }

  // if top button was pressed
	else if (interaction.customId == "topBuild" && itemPositionBuild[1] > 0) { 
    moveBlockY(-1)

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }

  // if bottom button was pressed
	else if (interaction.customId == "bottomBuild" && itemPositionBuild[1] < 11) { 
    moveBlockY(1)

    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  } 
  // if noting was pressed
  else if (interaction.customId == "leftBuild" 
    || interaction.customId == "rightBuild" 
    || interaction.customId == "topBuild" 
    || interaction.customId == "bottomBuild"
  ) {
    const spawnEmbed = new EmbedBuilder() // Create embed
      .setTitle(`Blueprint by user ${interaction.user.username}`)
      .setDescription(createRocketBlueprin.toString().replace(/,/g,'')) //convert board to string and remove ","
      .setColor(`#${randomColor}`)
      .setTimestamp()
      .setFooter({ text:`Response time is: ${ Date.now() - interaction.createdTimestamp}ms` }) // respond with res. time

    await interaction.deferUpdate()
    await interaction.editReply({ embeds: [spawnEmbed], components: [moveButtonBuild, selectItemBuild] }) // reply with embed
  }
})


client.login(token); 