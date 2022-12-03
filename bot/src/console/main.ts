// uilts
const delay = (ms: number) => {
	return new Promise(res => setTimeout(res, ms));
}

// rocket
const block = {
	blue: '+',
	green: '-',
	black: 'X',
	white: 'O',
};
const rocketParts = [
	{ position: [6,2],  color: block.black  }, 
	
	{ position: [6,3],  color: block.black   }, 
	{ position: [5,3],  color: block.black  }, 
	{ position: [7,3],  color: block.black  }, 
	
	{ position: [5,4],  color: block.black   }, 
	{ position: [6,4],  color: '=' },
	{ position: [7,4],  color: block.black   },
	
	{ position: [5,6],  color: block.white   }, 
	{ position: [7,6],  color: block.white   }, 
	{ position: [6,6],  color: '=' },
	
	{ position: [7,5],  color: block.white   }, 
	{ position: [5,5],  color: block.white   }, 
	{ position: [6,5],  color: block.white   },

	{ position: [7,7],  color: block.white   }, 
	{ position: [5,7],  color: block.white   }, 
	{ position: [6,7],  color: block.white   },
	
	{ position: [4,8],  color: block.black   }, 
	{ position: [5,8],  color: block.black   }, 
	{ position: [7,8],  color: block.black   },
	{ position: [8,8],  color: block.black   },
	
	{ position: [4,9],  color: block.black   },
	{ position: [8,9],  color: block.black   }
]

let cloudPoisition: number[][] = [];
let currentGround = 12; //4
let currentSky = 12 - currentGround;

let currentWorld: string[][] = [[], [], [], [], [], [], [], [], [], [], [], []];

let velocity = 700; // ms
let isMoving = {
	y: [true, true],
	x: [true, true]
};

let rocketTemplate = {
	name: 'rocket-1',
	parts: rocketParts
}

// functions
const moveRocket = (side: 'x' | 'y', size: 0 | 1) => {
	// 0 = down
	// 1 = up
	for (let i=0; i < rocketParts.length; i++) {
		const partPosition = rocketParts[i].position;
		const partsLength = rocketParts.length 
		
		const wasCheckedY = isMoving.y[1].toString();
		
		// move top/bottom
		if (side == 'y') {
			// check for colisio
			if (
				((12 - rocketParts[partsLength-1].position[1]) +
				(rocketParts[0].position[1] + rocketParts[partsLength-1].position[1])) <= 12
				&& size == 1
			) {
				isMoving.y[1] = false;
			}
			else if (rocketParts[partsLength-1].position[1] >= 11 && size == 0) {
				isMoving.y[0] = false;
			}
			
			// move
			if (isMoving.y[1] && size == 1 || wasCheckedY== 'true' && size == 1) {
				partPosition[1] -= 1;
			} else if (isMoving.y[0] && size == 0) {
				partPosition[1] += 1;
			}
		}
		
		// move left/right
		else if (side == 'x') {
			if (partPosition[0] != 0 && size != 0) {
				partPosition[0] -= 1;
			}
			
			
			if (partPosition[0] < currentWorld[0].length-1 && size != 1) {
				partPosition[0] += 1;
			}
		} else {
			console.log(`Wrong direction ${side}`);
		}
	}
}

const getWorld = () => {
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

const getRocket = () => {
	for (let i=0; i < rocketTemplate.parts.length; i++) {
		const rocketPartObj = rocketTemplate.parts[i];
		
		const xPosition = rocketPartObj.position[0];
		const yPosition = rocketPartObj.position[1];
		const color = rocketPartObj.color;
		
		currentWorld[yPosition][xPosition] = color;
	}
}

const flyRocket = async () => {
	while (true) {
		// slowly remove sky
		currentSky = currentSky == 0 ? 0:currentSky-1;
		
		// append objects
		getWorld();
		moveRocket('x', 0);
		getRocket();
		
		// write to console
		console.clear();
		console.log(currentWorld.join('').replace(/,/g, ' '))
		
		await delay(velocity);
	}
}






flyRocket();
