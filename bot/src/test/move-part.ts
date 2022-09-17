let itemPosition: any[] = []
let itemType: any = []

let blueprint: any[] = []

let blockJSON: any = {
  name: "rocketX",
  parts: []
}

//?
const generateJson = () => {
  for (let num in blockJSON.parts) {
    let xPosition = blockJSON.parts[num].position[0]
    let yPosition = blockJSON.parts[num].position[1]
    let blockColor = blockJSON.parts[num].color
    
    blueprint[yPosition][xPosition] = blockColor
  }
}

//?
const spawnBlueprint = () => {
  blueprint = []
  
  for (let i=0; i < 6; i++) {
    blueprint.push(["b ", "b ", "b ", "b ", "b ", "b ", "\n"])
  }
  generateJson()
}

//?
const spawnBlock = () => {
  spawnBlueprint()

  itemPosition = [0,0]
  itemType = ["W ", "fuel"]

  blueprint[itemPosition[1]][itemPosition[0]] = itemType[0]
  console.log(blueprint.toString().replace(/,/g,''))
}


const putBlock = () => {
  blockJSON.parts.push({
    position: itemPosition,
    color: itemType[0]
  })

  itemPosition = [0,0]
  itemType = ["W ", "fuel"]
}

const moveLeft = () => {
  spawnBlueprint()
  
  itemPosition[0] += 1
  blueprint[itemPosition[1]][itemPosition[0]] = itemType[0]
}





const everyFunc = () => {
  spawnBlock()
  
  moveLeft()
  moveLeft()
  
  putBlock()
  
  spawnBlock()  
  putBlock()
  moveLeft()
  moveLeft()
  moveLeft()
  moveLeft()
  
  putBlock()
}
everyFunc()


console.log(blueprint.toString().replace(/,/g,''))