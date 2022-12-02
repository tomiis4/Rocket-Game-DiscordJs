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
	{ position: [2,6],  color: block.black  }, 
	
	{ position: [3,6],  color: block.black   }, 
	{ position: [3,5],  color: block.black  }, 
	{ position: [3,7],  color: block.black  }, 
	
	{ position: [4,5],  color: block.black   }, 
	{ position: [4,6],  color: '=' },
	{ position: [4,7],  color: block.black   },
	
	{ position: [6,5],  color: block.white   }, 
	{ position: [6,7],  color: block.white   }, 
	{ position: [6,6],  color: '=' },
	
	{ position: [5,7],  color: block.white   }, 
	{ position: [5,5],  color: block.white   }, 
	{ position: [5,6],  color: block.white   },

	{ position: [7,7],  color: block.white   }, 
	{ position: [7,5],  color: block.white   }, 
	{ position: [7,6],  color: block.white   },
	
	{ position: [8,4],  color: block.black   }, 
	{ position: [8,5],  color: block.black   }, 
	{ position: [8,7],  color: block.black   },
	{ position: [8,8],  color: block.black   },
	
	{ position: [9,4],  color: block.black   },
	{ position: [9,8],  color: block.black   }
]

let cloudPoisition: number[][] = [];
let currentGround = 12; //4
let currentSky = 12 - currentGround;

let currentWorld: string[][] = [[], [], [], [], [], [], [], [], [], [], [], []];

let velocity = 700; // ms

let rocketTemplate = {
	name: 'rocket-1',
	parts: rocketParts
}

// functions
const moveRocket = (side: 'x' | 'y', size: 0 | 1) => {
	for (let i=0; i < rocketParts.length; i++) {
		const partPosition = rocketParts[i].position;
		
		// move top/bottom
		if (side == 'y') {
			//FIXME check border colision 
			if (rocketParts[0].position[0] == 0 && size == 1) {
				return;
			} else if (rocketParts[rocketParts.length-1].position[0] == rocketParts.length-1 && size == 0) {
				return;
			} else {
				partPosition[0] += size==0 ? -1 : 1;
			}
		}
		
		// move left/right
		else if (side == 'x') {
			partPosition[1] += size==0 ? -1 : 1;
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
		
		currentWorld[xPosition][yPosition] = color;
	}
}

const flyRocket = async () => {
	while (true) {
		// slowly remove sky
		currentSky = currentSky == 0 ? 0:currentSky-1;
		
		// append objects
		getWorld();
		getRocket();
		moveRocket('y', 0)
		
		// write to console
		console.clear();
		console.log(currentWorld.join('').replace(/,/g, ' '))
		
		await delay(velocity);
	}
}






flyRocket();
