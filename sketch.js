let baseMap; 																							// Stores empty map with oceans
let timelineUI; 																						// Stores timeline layer with year numbers and markings
let BC3500, BC2500, BC1500, BC1000, BC500, BC200, BC30, AD200, AD500, AD750, AD979, AD1215, AD1453; 	// variables for storing time period images
let timePeriod; 																						// holds current image year image (temporarily holds BC3500, BC2500, BC1500...)
let timePeriodNum; 																						// holds the current time period the switch statement should use for output, with 3500 BC starting as zero (0,1,2,3...)
let timelineX, timelineY, timelineInterval, clickboxSize; 												// holds placement values for timeline clickboxes
let isWide; 																							// used for logic statements to test if screen is taller/wider than 1920x1080
let wideAspectScaler, tallAspectScaler; 																// multipliers attached to draw functions that adjust image width/height & sprite x/y to fit inside of windows
let baseAspect; 																						// variable used by aspectScaler(); to store whether to use windowWidth or windowHeight in initial scaling
let contentWidth, contentHeight; 																		// variables used to display the physical dimensions of scaled content
let marginWidth, marginHeight;																			// stores size of margins

function preload() {																					// Loads assets into variables
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
	checkAspectRatio(); 																				//sets isWide to true/false based on window size
	aspectScaler(); 																					//sets variables wideAspectScaler, tallAspectScaler, and baseAspect
	contentSize();																						//sets contentWidth and contentHeight (dimensions of scaled image) using wideAspectScaler, tallAspectScaler, and baseAspect
	timePeriodClickBoxes = new Group(); 																// Group for time period clickboxes along timeline
	textBoxes = new Group();																			// Group for all text boxes, used by removeText to wipe entire sprite group
	timePeriodNum = 0; 																					// Sets time period to initial state (3500BC)
	timePeriod = BC3500; 																				// sets initial image to (BC3500)
	timelineX = 0.1562;																					//variable setting intial timeline X pos
	timelineY = 0.895; 																					//variable setting initial timeline Y pos
	timelineInterval = 0.0578; 																			//variable used to space out timeline
	clickboxSize = 0.04;																				//Size of clickboxes
	generateTimelineDetection();																		// Generates initial timeline clickboxes
	textBC3500();																						// Draws initial state clickboxes	
}
// ------------------------------------------- Draw function runs constantly, effectively the main in p5.js sketches ------------------------------------------------
function draw() {
	//add windowResize()
	background(0); 																						// Clears cursor trail on margins
	mapStateSetter(timePeriodNum); 																		// Sets correct images to be run by drawMapsWithAspectRatio()
	drawMapsWithAspectRatio(); 																			// Forces 1920x1080 aspect ratio -- Displays all images
	cursorTracking(); 																					// Shows Cursor
	//drawSprites();																					// used for displaying clickboxes
}										
// -------------------------------------------------------- Call Functions ---------------------------------------------------
function mapStateSetter(stateNum) { 																	//Sets image holder 'timePeriod' to image permanents, based on timePeriodNum, literally all this does is prime the appropriate image to display
	switch (stateNum) {
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
function generateTimelineDetection() { 																	// Declares all sprites and enables click detection
	for(x=0; x<12; x++){
		generateTimelineClickbox(x);
	}
}
function generateTimelineClickbox(n) {																// Declares clickboxes for timeline below, x represents the x coordinate of the sprite, num represents the time period being represented if a sprite is clicked (0-12)
	timelineSprite = createSprite(marginWidth + (contentWidth)*(timelineX+timelineInterval*n), marginHeight + (contentHeight*timelineY), contentWidth*clickboxSize, contentWidth*clickboxSize); // 3500 BC
	timelineSprite.mouseActive = true;
	timelineSprite.onMouseReleased = function () {
	timePeriodClickBoxes.add(timelineSprite);
		console.log("time period "+n);
		removeText();
		displayCorrectTextboxes(n);
		timePeriodNum = n;
	}
}
function removeText() {																					// Removes clickboxes from previous map states
	textBoxes.removeSprites();
}
function cursorTracking() { 																			// Tracks Cursor
	fill(255,0,0,70);
	ellipse(mouseX, mouseY, 20, 20);
}
function checkAspectRatio() {												 							// Checks Aspect Ratio and sets boolean isWide for use in generateTimelineDetection 
	if (windowWidth/windowHeight >= 1920/1080) {  		 								// Checks if display is wider than image
		isWide = true;
	} else if (windowWidth/windowHeight < 1920/1080) {									// Checks if display is taller than image
		isWide = false;
	}
}
function aspectScaler() {																				// Sets wideAspectScaler & tallAspectScaler based on isWide and isTall
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
function contentSize() {																				// Sets contentWidth && contentHeight so that the image is always displayed at a 1920 x 1080 aspect ratio 
	contentWidth = baseAspect*wideAspectScaler;
	contentHeight = baseAspect*tallAspectScaler;
	marginWidth = (windowWidth-contentWidth)/2;
	marginHeight = (windowHeight-contentHeight)/2;
}
function drawMapsWithAspectRatio() { 								 									// Determines aspect ratio with checkAspectRatio(); and calls proper drawMap function
	checkAspectRatio();
	drawMap(timePeriod);
}
function drawMap(timePeriod) { 																			// Calls images to fit inside a wider window									// CAN WE REMOVE (TIMEPERIOD)??? LOOKS SUPER UNNECESSARY // SHOULD THIS BE CONTENTWIDTH?
	image(baseMap, windowWidth/2, windowHeight/2, contentWidth, contentHeight);									// Static Base Map
	image(timelineUI, windowWidth/2, windowHeight/2, contentWidth, contentHeight);									// Static Timeline UI
	image(timePeriod, windowWidth/2, windowHeight/2, contentWidth, contentHeight);									// Sets time period image based on timePeriod
}
function generateClickbox(x, y, z) {
	sprite = createSprite(marginWidth + (contentWidth)*(x), marginHeight + contentHeight*y, contentWidth * clickboxSize, contentWidth * clickboxSize);
	textBoxes.add(sprite);
	sprite.mouseActive = true;
	sprite.onMouseReleased = function() {
		console.log(z);
		window.open(z);
	}
}
function displayCorrectTextboxes(stateNum) {
	switch (stateNum) {
		case 0:
			textBC3500();
			break;
		case 1:
			textBC2500();
			break;
		case 2:
			textBC1500();
			break;
		case 3:
			textBC1000();
			break;
		case 4:
			//textBC500();
			break;
		case 5:
			//textBC200();
			break;
		case 6:
			//textBC30();
			break;
		case 7:
			//textAD200();
			break;
		case 8:
			//textAD500();
			break;
		case 9:
			//textAD750();
			break;
		case 10:
			//textAD979()
			break;
		case 11:
			//textAD1215();
			break;		
		case 12:
			//textAD1435();
			break;
	}
}
function mousePressed() {																				// Used for development purposes, logs coordinates used for generateClickbox()
	console.log((mouseX-marginWidth)/contentWidth, (mouseY-marginHeight)/contentHeight);
}
function textBC3500() {
	generateClickbox(.273,.6,"https://en.wikipedia.org/wiki/Ancient_Egyptian_agriculture");
	generateClickbox(.505,.33,"https://en.wikipedia.org/wiki/Akkadian_Empire");
	generateClickbox(.52,.405,"https://en.wikipedia.org/wiki/Sumer#Uruk_period");
}
function textBC2500() {
	generateClickbox(.47,.31,"https://en.wikipedia.org/wiki/Sumer#Early_Dynastic_Period");
	generateClickbox(.345,.19,"https://en.wikipedia.org/wiki/Anatolia#Ancient_Near_East_(Bronze_and_Iron_Ages)");
	generateClickbox(.355,.31,"https://en.wikipedia.org/wiki/Canaan#Middle_Bronze_Age");
	generateClickbox(.265,.455,"https://en.wikipedia.org/wiki/Ancient_Egypt#Old_Kingdom_(2686%E2%80%932181_BC)");	
}
function textBC1500() {
	generateClickbox(.265,.465,"https://en.wikipedia.org/wiki/New_Kingdom_of_Egypt");
	generateClickbox(.346,.365,"https://en.wikipedia.org/wiki/Canaan#Late_Bronze_Age_cuneiform_(1500%E2%80%931000_BC)");
	generateClickbox(.405,.25,"https://en.wikipedia.org/wiki/Mitanni");
	generateClickbox(.35,.15,"https://en.wikipedia.org/wiki/Hittites");
	generateClickbox(.492,.365,"https://en.wikipedia.org/wiki/Babylonia#Kassite_Dynasty,_1595%E2%80%931155_BC");
	generateClickbox(.6,.45,"https://en.wikipedia.org/wiki/Elam#Middle_Elamite_period_(c.1500_%E2%80%93_c.1100_BC)");
}
function textBC1000() {
	generateClickbox(.27,.468,"https://en.wikipedia.org/wiki/Third_Intermediate_Period_of_Egypt");
	generateClickbox(.33,.42,"https://en.wikipedia.org/wiki/History_of_ancient_Israel_and_Judah#Iron_Age_I_(1200%E2%80%931000_BCE)");
	generateClickbox(.333,.275,"https://en.wikipedia.org/wiki/Phoenicia#High_point:_1200%E2%80%93800_BC");
	generateClickbox(.332,.2,"https://en.wikipedia.org/wiki/Syro-Hittite_states");
	generateClickbox(.42,.175,"https://en.wikipedia.org/wiki/Urartu#Origins");
	generateClickbox(.45,.25,"https://en.wikipedia.org/wiki/Assyria#Assyria_during_the_Bronze_Age_Collapse,_1055%E2%80%93936_BC");
	// Resume here, need arabian kingdoms, babylonia ...
	
}