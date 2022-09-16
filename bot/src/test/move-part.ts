let itemPosition: any[] = []
let itemType: any = []

let blueprint: any[] = []

let blockJSON: any = {
  name: "rocketX",
  parts: []
}

const spawnBlueprint = () => {
  blueprint = []
  
  for (let i=0; i < 6; i++) {
    blueprint.push(["b ", "b ", "b ", "b ", "b ", "b ", "\n"])
  }
}


const spawnBlock = () => {
  spawnBlueprint()

  itemPosition = [0,0]
  itemType = ["W ", "fuel"]

  blueprint[itemPosition[1]][itemPosition[0]] = itemType[0]
  console.log(blueprint.toString().replace(/,/g,''))
}
spawnBlock()


const putBlock = () => {
  blockJSON.parts.push({
    position: itemPosition,
    color: itemType[1]
  })

  itemPosition = [0,0]
  itemType = ["W ", "fuel"]
}


const moveLeft = () => {
  spawnBlueprint()
  
  itemPosition[0] += 1
  blueprint[itemPosition[1]][itemPosition[0]] = itemType[0]
}



moveLeft()
putBlock()
spawnBlock()
moveLeft()
moveLeft()





console.log(blueprint.toString().replace(/,/g,''))