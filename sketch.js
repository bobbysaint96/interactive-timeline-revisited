let baseMap; 													// Stores empty map with oceans
let timelineUI; 												// Stores timeline layer with year numbers and markings
let BC3500, BC2500, BC1500, BC1000, BC500, BC200, BC30, AD200, AD500, AD750, AD979, AD1215, AD1453; // variables for storing time period images
let timePeriod; 												// holds current image year image (temporarily holds BC3500, BC2500, BC1500...)
let timePeriodNum; 												// holds the current time period the switch statement should use for output, with 3500 BC starting as zero (0,1,2,3...)
let timelineX, timelineY, timelineInterval, clickboxSize; 		// holds placement values for timeline clickboxes
let isWide; 													// used for logic statements to test if screen is taller/wider than 1920x1080
let wideAspectScaler, tallAspectScaler; 						// multipliers attached to draw functions that adjust image width/height & sprite x/y to fit inside of windows
let baseAspect; 												// variable used by aspectScaler(); to store whether to use windowWidth or windowHeight in initial scaling
let contentWidth, contentHeight; 								//variables used to display the physical dimensions of scaled content

// Loads images into permanent variables
function preload() {
	baseMap = loadImage('images/baseMap.png');
	timelineUI = loadImage('images/timelineUI.png');
	BC3500 = loadImage('images/BC3500.png');
	BC2500 = loadImage('images/BC2500.png');
	BC1500 = loadImage('images/BC1500.png');
	BC1000 = loadImage('images/BC1000.png');
	BC500 = loadImage('images/BC500.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
	rectMode(CENTER);
	checkAspectRatio(); 														//sets isWide to true/false based on window size
	aspectScaler(); 															//sets variables wideAspectScaler, tallAspectScaler, and baseAspect
	contentSize();																//sets contentWidth and contentHeight (dimensions of scaled image) using wideAspectScaler, tallAspectScaler, and baseAspect
	
	timePeriodClickBoxes = new Group(); 										// Group for time period clickboxes along timeline
	textBoxes = new Group();													// Group for all text boxes, used by removeText to wipe entire sprite group
	
	timePeriodNum = 0; 															// Sets time period to initial state (3500BC)
	timePeriod = BC3500; 														// sets initial image to (BC3500)
	
	console.log("isWide = " + isWide);																// information on aspect ratio relative to 1920x1080p
	console.log("window: " +windowWidth+ "x" +windowHeight);					// gives device browser, image, and device dimensions
	console.log("image: " +timePeriod.width+ "x" +timePeriod.height);			// windowWidth shows effective usable window space, timeperiod.width shows image base scaling, displaywidth shows width of screen overall
	console.log("screen: " +displayWidth+ "x" +displayHeight); 
	
	timelineX = 0.1562;															//variable setting intial timeline X pos
	timelineY = 0.895; 															//variable setting initial timeline Y pos
	timelineInterval = 0.0578; 													//variable used to space out timeline
	clickboxSize = 0.04;														//Size of clickboxes
	
	generateTimelineDetection();												//generates timeline sprites & calls for text box creation
	text3500BC();																// draws initial text boxes	
}

function draw() { 																// Runs Constantly
	mapStateSetter(timePeriodNum); 												// Sets images and dialogues
	background(0); 																// Clears previous image states & cursor trail
	drawMapsWithAspectRatio(); 													// Determines screen aspect ratio and draws map + timeline + countries
	cursorTracking(); 															// shows cursor with transparent highlight
	//drawSprites();															// used for displaying clickboxes
}

// -------------------------------------------------------- Call Functions ---------------------------------------------------

//could these have the same name with different number inside () to be used as a loop

function generateClickbox(x, y, z) {
	sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(x), ((windowHeight - (contentHeight))/2) + (contentHeight *y), contentWidth * clickboxSize, contentWidth * clickboxSize);
	textBoxes.add(sprite);
	sprite.mouseActive = true;
	sprite.onMouseReleased = function() {
		console.log(z);
		window.open(z);
	}
}

function text3500BC() {
	generateClickbox(.273, .6, "https://en.wikipedia.org/wiki/Ancient_Egyptian_agriculture");
	generateClickbox(.505,.33,"https://en.wikipedia.org/wiki/Akkadian_Empire");
	generateClickbox(.52,.405,"https://en.wikipedia.org/wiki/Sumer#Uruk_period");
}
function text2500BC() {
	generateClickbox(.47,.31,"https://en.wikipedia.org/wiki/Sumer#Early_Dynastic_Period");
	generateClickbox(.345,.19,"https://en.wikipedia.org/wiki/Anatolia#Ancient_Near_East_(Bronze_and_Iron_Ages)");
	generateClickbox(.355,.31,"https://en.wikipedia.org/wiki/Canaan#Middle_Bronze_Age");
	generateClickbox(.265,.455,"https://en.wikipedia.org/wiki/Ancient_Egypt#Old_Kingdom_(2686%E2%80%932181_BC)");	
}
function text1500BC() {
	generateClickbox(.265,.465,"https://en.wikipedia.org/wiki/New_Kingdom_of_Egypt");
	generateClickbox(.346,.365,"https://en.wikipedia.org/wiki/Canaan#Late_Bronze_Age_cuneiform_(1500%E2%80%931000_BC)");
	generateClickbox(.405,.25,"https://en.wikipedia.org/wiki/Mitanni");
	generateClickbox(.35,.15,"https://en.wikipedia.org/wiki/Hittites");
	generateClickbox(.492,.365,"https://en.wikipedia.org/wiki/Babylonia#Kassite_Dynasty,_1595%E2%80%931155_BC");
	generateClickbox(.6,.45,"https://en.wikipedia.org/wiki/Elam#Middle_Elamite_period_(c.1500_%E2%80%93_c.1100_BC)");
}
function text1000BC() {
	generateClickbox(.27,.468,"https://en.wikipedia.org/wiki/Third_Intermediate_Period_of_Egypt");
	generateClickbox(.33,.42,"https://en.wikipedia.org/wiki/History_of_ancient_Israel_and_Judah#Iron_Age_I_(1200%E2%80%931000_BCE)");
	generateClickbox(.333,.275,"https://en.wikipedia.org/wiki/Phoenicia#High_point:_1200%E2%80%93800_BC");
	generateClickbox(.332,.2,"https://en.wikipedia.org/wiki/Syro-Hittite_states");
	generateClickbox(.42,.175,"https://en.wikipedia.org/wiki/Urartu#Origins");
	generateClickbox(.45,.25,"https://en.wikipedia.org/wiki/Assyria#Assyria_during_the_Bronze_Age_Collapse,_1055%E2%80%93936_BC");
	// Resume here, need arabian kingdoms
	
}
		// replace with for loop & 3 input function? - x coordinate y coordinate - hyperlink
		// doesn't matter if new sprites have same name, they can have different links

function mapStateSetter(timePeriodNum) { //Sets image holder 'timePeriod' to image permanents, based on timePeriodNum
	switch (timePeriodNum) {
		case 0:
			timePeriod = BC3500;
			break;
		case 1:
			timePeriod = BC2500;
			break;
		case 2:
			timePeriod = BC1500;
			break;
		case 3:
			timePeriod = BC1000;
			break;
		case 4:
			timePeriod = BC500;
			break;
		case 5:
			//timePeriod = BC200;
			break;
		case 6:
			//timePeriod = BC30;
			break;
		case 7:
			//timePeriod = AD200;
			break;
		case 8:
			//timePeriod = AD500;
			break;
		case 9:
			//timePeriod = AD750;
			break;
		case 10:
			//timePeriod = AD979;
			break;
		case 11:
			//timePeriod = AD1215;
			break;		
		case 12:
			//timePeriod = AD1435;
			break;
	}
}

function generateTimelineDetection() { // Declares all sprites and enables click detection
	let timelineSprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+0*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 3500 BC
	timelineSprite.mouseActive = true;
	timelineSprite.onMouseReleased = function () {
	timePeriodClickBoxes.add(timelineSprite);
		console.log("3500BC");
		removeText();
		//generateClickbox(.273, .6, "https://en.wikipedia.org/wiki/Ancient_Egyptian_agriculture");
		text3500BC();  //this shit works put this back if it breaks
		timePeriodNum = 0;
	}
	let bc2500sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+1*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 2500 BC
	bc2500sprite.mouseActive = true;
	bc2500sprite.onMousePressed = function () {
		console.log("2500BC");
		removeText();
		text2500BC();
		timePeriodNum = 1;
	}
	let bc1500sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+2*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 1500 BC
	bc1500sprite.mouseActive = true;
	bc1500sprite.onMousePressed = function () {
		removeText();
		text1500BC();
		console.log("1500BC");
		timePeriodNum = 2;
	}
	let bc1000sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+3*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 1000 BC
	bc1000sprite.mouseActive = true;
	bc1000sprite.onMousePressed = function () {
		removeText();
		text1000BC();
		console.log("1000BC");
		timePeriodNum = 3;
	}
	let bc500sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+4*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 500 BC
	bc500sprite.mouseActive = true;
	bc500sprite.onMousePressed = function () {
		removeText();
		//text500BC();
		timePeriodNum = 4;
		console.log("500BC");
	}
	let bc200sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+5*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 200 BC
	bc200sprite.mouseActive = true;
	bc200sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 5;
		console.log("200BC");
	}
	let bc30sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+6*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 30 BC
	bc30sprite.mouseActive = true;
	bc30sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 6;
		console.log("30BC");
	}
	let ad200sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+7*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 200 AD
	ad200sprite.mouseActive = true;
	ad200sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 7;
		console.log("200AD");
	}
	let ad500sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+8*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 500 AD
	ad500sprite.mouseActive = true;
	ad500sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 8;
		console.log("500AD");
	}
	let ad750sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+9*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 750 AD
	ad750sprite.mouseActive = true;
	ad750sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 9;
		console.log("750AD");
	}
	let ad979sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+10*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 979 AD
	ad979sprite.mouseActive = true;
	ad979sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 10;
		console.log("979AD");
	}
	let ad1215sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+11*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 1215 AD
	ad1215sprite.mouseActive = true;
	ad1215sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 11;
		console.log("1215AD");
	}
	let ad1453sprite = createSprite(((windowWidth - (contentWidth))/2) + (contentWidth)*(timelineX+12*timelineInterval), ((windowHeight - (contentHeight))/2) + (contentHeight * timelineY), contentWidth * clickboxSize, contentWidth * clickboxSize); // 1453 AD
	ad1453sprite.mouseActive = true;
	ad1453sprite.onMousePressed = function () {
		removeText();
		timePeriodNum = 12;
		console.log("1453AD");
	}
}

function cursorTracking() { 				// Tracks Cursor
	fill(255,0,0,70);
	ellipse(mouseX, mouseY, 20, 20);
}

function removeText() {						// Removes clickboxes from previous map states
	textBoxes.removeSprites();
}

function checkAspectRatio() {												 			// Checks Aspect Ratio and sets boolean isWide for use in generateTimelineDetection 
	if (windowWidth/windowHeight >= 1920/1080) {  		 								// Checks if display is wider than image
		isWide = true;
	} else if (windowWidth/windowHeight < 1920/1080) {									// Checks if display is taller than image
		isWide = false;
	}
}

function aspectScaler() {																// Sets wideAspectScaler & tallAspectScaler based on isWide and isTall
	if (isWide == true) {
		wideAspectScaler = 1920/1080;													//wideAspectScaler is multiplied against baseAspect in most functions, 
		tallAspectScaler = 1;															//results in windowHeight * 1920/1080 or windowWidth * 1,
		baseAspect = windowHeight;														//wideAspectScaler * baseAspect will always give the effective Width of the content scaled to 1920x1080p
	} else {
		wideAspectScaler = 1;															//tallAspectScaler multiplied against baseAspect as well 
		tallAspectScaler = 1080/1920;													//results in windowHeight * 1 or windowWidth * 1080/1920
		baseAspect = windowWidth;														//tallAspectScaler * baseAspect will always give the effective height of the content scaled to 1920x1080p
	}
}

function contentSize() {																// Sets contentWidth && contentHeight so that the image is always displayed at a 1920 x 1080 aspect ratio 
	contentWidth = baseAspect * wideAspectScaler;
	contentHeight = baseAspect * tallAspectScaler;
}

function drawMapsWithAspectRatio() { 								 					// Determines aspect ratio with checkAspectRatio(); and calls proper drawMap function
	checkAspectRatio();
	drawMap(timePeriod);
}

function drawMap(timePeriod) { 																														// Calls images to fit inside a wider window
	image(baseMap, windowWidth/2, windowHeight/2, baseAspect * wideAspectScaler, baseAspect * tallAspectScaler);									// Static Base Map
	image(timelineUI, windowWidth/2, windowHeight/2, baseAspect * wideAspectScaler, baseAspect * tallAspectScaler);									// Static Timeline UI
	image(timePeriod, windowWidth/2, windowHeight/2, baseAspect * wideAspectScaler, baseAspect * tallAspectScaler);									// Sets time period image based on timePeriod
}