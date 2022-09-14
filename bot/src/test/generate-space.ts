const blue = "b "
const purple = "p "
const white = "w"

//! .toString().replace(/,/g,'')

let mainArr: any[] = []

let fullBlue = [blue, blue, blue, blue, blue, "\n"]
let fullPurple = [purple, purple, purple, purple, purple, "\n"]

// let currentPurpleSize: number = 10

// function x() {
//   mainArr = []
//   if (currentPurpleSize != 0) {
//     for (let i=0; i < currentPurpleSize; i++) {
//       mainArr.push(fullPurple)
    
//       if (i == currentPurpleSize -1) {
//         for (let j=0; j < (12-currentPurpleSize); j++) {
//           mainArr.push(fullBlue)
//         }
//       }
//     }
//   } else {
//     for (let j=0; j < 12; j++) {
//       mainArr.push(fullBlue)
//     }
//   }
// }


// while (currentPurpleSize <= 11) {
//   x()
//   currentPurpleSize++
  
//   console.log("*******************************");
//   console.log(mainArr.toString().replace(/,/g, ''))
//   console.log("*******************************");
  
// }

// for (let i=0; i < currentPurpleSize; i++) {
//   displayWorld.push([purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple,"\n"])

//   if (i == currentPurpleSize -1) {
//     for (let j=0; j < (12-currentPurpleSize); j++) {
//       displayWorld.push([blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue,"\n"])
//     }
//   }
// }
let currentPurpleSizeX = 0
let displayWorldX: any[]= []

const spawnSpaceX = () => {
  displayWorldX = []

  if (currentPurpleSizeX != 0) {
    for (let i=0; i < currentPurpleSizeX; i++) {
      displayWorldX.push([purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple,"\n"])
    
      if (i == currentPurpleSizeX -1) {
        for (let j=0; j < (12-currentPurpleSizeX); j++) {
          displayWorldX.push([blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue,"\n"])
        }
      }
    }
  } else {
    for (let j=0; j < 12; j++) {
      displayWorldX.push([blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue, blue,"\n"])
    }
  }
}

const xFunc = () => {
  for (let currentHeight =0; currentHeight < 12; currentHeight++ ) {
    while (currentPurpleSizeX <= 12) {
      spawnSpaceX()
      console.log("-------------displayWorldX")
      console.log(displayWorldX.length)
      console.log("-------------displayWorldX")
      currentPurpleSizeX++
    }
  }
}

xFunc()