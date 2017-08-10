#pragma strict


var score3DText: TextMesh;
var time3DText: TextMesh;
var meme3DText: TextMesh;
var rainSound: AudioSource;
var thunderSound: AudioSource;
var pianoMusic: AudioSource;
private var thunderCounter: int = 0;
var rainParticles: ParticleEmitter;
var splashPaddleParticles: ParticleEmitter;
var splashBonusParticles1: ParticleEmitter;
var splashBonusParticles2: ParticleEmitter;
var ball: GameObject;
var flashObject: GameObject;
var bonusGate: GameObject;
static var wallLeft: GameObject;
var wallRight: GameObject;
static var wallTop: GameObject;
var paddleObject: GameObject;
private var scoreModifier: int;
private var newFlashSize: Rect;
static var yourScore: int;

static var winToggle : boolean;
private var score : int = 0;
private var time : int = 60;
private var color : String = "Green";
private var goals : int = 0;
static var gameCount: int = 0;
static var lossCount: int = 0;
static var winCount: int = 0;
private var roundCount: int = 0; 

var challengeAccepted : Texture;
var foreverAlone: Texture;
var fu: Texture;
var fyeah: Texture;
var herpDerp: Texture;
var omg: Texture;
var wtf: Texture;
var ok: Texture;
var yuno: Texture;
var memeIconPanel: GameObject;

var particlesSquares: ParticleAnimator;
//var splashBonusParticlesAnimator1: ParticleAnimator;
//var splashBonusParticlesAnimator2: ParticleAnimator;

function Awake() {
	Screen.showCursor = false;
	TitleScene.SetPlayerPrefDefaults();
	roundCount = 0;
	OptionsScene.setColor();
	// not sure if these assignments are necessary
	bonusGate = GameObject.Find("BonusArea");
	wallLeft = GameObject.Find("wallLeft");
	wallRight = GameObject.Find("wallRight");
	wallTop = GameObject.Find("wallTop");
	ball = GameObject.Find("Ball");
	
	newFlashSize = Rect(0, 0, Screen.width, Screen.height); //Pixel Inset - Rect (x, y, width, height)
	SetDifficulty();
	InitiateMusic();
	InitiateRain();;
	InvokeRepeating("UpdateScore", 1, 1); // every second
	
	// paddle objects
	paddleObject = GameObject.Find("PaddleRound");
	var flat : GameObject;
	flat = GameObject.Find("PaddleFlat");
	var round : GameObject;
	round = GameObject.Find("PaddleRounded");
	var roundPaddle : GameObject;
	roundPaddle = GameObject.Find("Paddle");
	var roundMask : GameObject;
	roundMask = GameObject.Find("Mask");
	
	if (PlayerPrefs.GetString("Paddle") == "Flat") {
		// code to enable flat paddle and disable round paddle
		flat.renderer.enabled = true;
		flat.collider.enabled = true;
		roundPaddle.renderer.enabled = false;
		roundPaddle.collider.enabled = false;
		roundMask.renderer.enabled = false;
		roundMask.collider.enabled = false;
		paddleObject = flat;
	}
	else {
		// code to enable round paddle and disable flat paddle
		flat.renderer.enabled = false;
		flat.collider.enabled = false;
		roundPaddle.renderer.enabled = true;
		roundPaddle.collider.enabled = true;
		roundMask.renderer.enabled = true;
		roundMask.collider.enabled = true;
		paddleObject = round;
	}
	
	setParticleColor();
	
	if (PlayerPrefs.GetString("Mode") == "Infinite") {
		time3DText.text = "Rounds: ";
	}
	InvokeRepeating("UpdateTime", 1, 1);
	InvokeRepeating("IncreaseRainVolume",1, 1);
	InvokeRepeating("IncreaseRainParticles",1, 1);
	InvokeRepeating("CheckMemes", 1, 1);
	InvokeRepeating("ChangeBonusTarget", 10, 10);
	InvokeRepeating("Flash", 20, 20);
	InvokeRepeating("Thunder", 20, 20);
	InvokeRepeating("ShrinkPaddle", 20, 20);
	
	if (PlayerPrefs.GetString("Color") == "Party") { // needs to happen after setting particle color
		color = "Purple"; // starting color for purple party mode
		InvokeRepeating("cycleColor", 0, 1.618); // cycle colors
		particlesSquares.colorAnimation = [Color.green, Color.blue, Color.red, Color.cyan, Color.magenta]; // change bonus particles to rainbow
	}
	
	// enhanced collision detection in very hard difficulty where objects move very fast
	if (PlayerPrefs.GetString("Difficulty") == "Very Hard") {
		Debug.Log("detection now continuous dynamic");
		ball.rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
	}
	
}

// checks for meme achievement score modifiers and 
function CheckMemes() {
	// Herp Derp
	if (time == 5) { // 
		if (goals == 0) {
			ApplyMeme(0);
		}
	}
	// Forever Alone
	if (roundCount == 0 && time == 45) { // 
		if (gameCount != 0 && gameCount % 5 == 0) {
			ApplyMeme(1);
		}
	}
	// Challenge Accepted
	if (time == 30) { // 
		if (roundCount == 0 && PlayerPrefs.GetString("Difficulty") == "Ironic") {
			ApplyMeme(2);
		}
	}
	
	// WTF
	if (time == 59) { // 
		if (lossCount != 0 && lossCount % 3 == 0 && lossCount % 7 != 0) {
			ApplyMeme(3);
		}
	}
	
	// F Yeah
	if (time == 50) { // 
		if (roundCount != 0 && roundCount % 3 == 0 && roundCount % 8 != 0) {
			ApplyMeme(4);
		}
	}
	
	// FU
	if (time == 59) { // 
		if (lossCount != 0 && lossCount % 7 == 0) {
			ApplyMeme(5);
		}
	}
	
	// OMG
	if (time == 50) { // 
		if (roundCount != 0 && roundCount % 8 == 0) {
			ApplyMeme(6);
		}
	}
	// OK
	if (time == 45) { // 
		if (roundCount == 0 && PlayerPrefs.GetString("Paddle") == "Flat") {
			ApplyMeme(7);
		}
	}
	// Y U NO
	if (time == 59) { // 
		if (winCount != 0 && winCount % 3 == 0) {
			ApplyMeme(8);
		}
	}
}

// shows the meme bonus icon and text
function ApplyMeme(n : int) {
	if (n == 0) {
		meme3DText.text = "Herp Derp - fail to score";
		meme3DText.renderer.enabled = true;
		score += 333 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = herpDerp;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement0", 1);
	}
	if (n == 1) {
		meme3DText.text = "Forever Alone - play 5 games";
		meme3DText.renderer.enabled = true;
		score += 111 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = foreverAlone;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement1", 1);
	}
	if (n == 2) {
		meme3DText.text = "Challenge Accepted - ironic";
		meme3DText.renderer.enabled = true;
		score += 333 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = challengeAccepted;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement2", 1);
	}
	if (n == 3) {
		meme3DText.text = "WTF - lose 3 games in a row";
		meme3DText.renderer.enabled = true;
		score += 444 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = wtf;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement3", 1);
	}
	if (n == 4) {
		meme3DText.text = "F%$! Yeah - survive 3 rounds";
		meme3DText.renderer.enabled = true;
		score += 555 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = fyeah;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement4", 1);
	}
	if (n == 5) {
		meme3DText.text = "FUFUFU - lose 7 games in a row";
		meme3DText.renderer.enabled = true;
		score += 666 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = fu;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement5", 1);
	}
	if (n == 6) {
		meme3DText.text = "OMG - survive 8 rounds";
		meme3DText.renderer.enabled = true;
		score += 777 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = omg;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement6", 1);
	}
	if (n == 7) {
		meme3DText.text = "OK - commit to flat";
		meme3DText.renderer.enabled = true;
		score += 333 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = ok;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement7", 1);
	}
	if (n == 8) {
		meme3DText.text = "Y U NO LOSE! - win 3 games";
		meme3DText.renderer.enabled = true;
		score += 888 * scoreModifier;
		memeIconPanel.renderer.material.mainTexture = yuno;
		memeIconPanel.renderer.enabled = true;
		Invoke("CancelMeme", 4);
		PlayerPrefs.SetInt("Achievement8", 1);
	}
}

// used by ShowMeme to limit the amount of time meme is displayed on screen
function CancelMeme () {
	meme3DText.renderer.enabled = false;
	memeIconPanel.renderer.enabled = false;
}
   
// cycles through colors for purple party (rainbow) mode
function cycleColor() {
	
	if (color == "White") {
		RenderSettings.ambientLight = Color.white;
		color = "Red";
	}
	else if (color == "Red") {
		RenderSettings.ambientLight = Color.red;
		color = "Blue";
	}
	else if (color == "Blue") {
		RenderSettings.ambientLight = Color.blue;
		color = "Yellow";
	}
	else if (color == "Yellow") {
		RenderSettings.ambientLight = Color.yellow;
		color = "Cyan";
	}
	else if (color == "Cyan") {
		RenderSettings.ambientLight = Color.cyan;
		color = "Magenta";
	}	
	else if (color == "Magenta") {
		RenderSettings.ambientLight = Color.magenta;
		color = "Orange";
	}
	else if (color == "Orange") {
		RenderSettings.ambientLight = Color(1, 0.5, 0);
		color = "Purple";
	}
	else if (color == "Purple") {
		RenderSettings.ambientLight =  Color(0.5, 0, 1);
		color = "White";
	}
}

// sets the color of particles to match player preference
function setParticleColor() {
	if (PlayerPrefs.GetString("Color") == "White") {
		particlesSquares.colorAnimation = [Color.white, Color.grey, Color.white, Color.grey, Color.white];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.grey, Color.white, Color.grey, Color.white];
		//colorAnimation = [Color.white, Color.grey, Color.white, Color.grey, Color.white];
	}
	else if (PlayerPrefs.GetString("Color") == "Green") {
		particlesSquares.colorAnimation = [Color.green, Color.green, Color.green, Color.green, Color.green];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.green, Color.white, Color.green, Color.green];
		//splashBonusParticlesAnimator2.colorAnimation = [Color.white, Color.green, Color.white, Color.green, Color.green];
	}
	else if (PlayerPrefs.GetString("Color") == "Red") {
		particlesSquares.colorAnimation = [Color.red, Color.red, Color.red, Color.red, Color.red];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.red, Color.white, Color.red, Color.red];
		//splashBonusParticlesAnimator2.colorAnimation = [Color.white, Color.red, Color.white, Color.red, Color.red];
	}
	else if (PlayerPrefs.GetString("Color") == "Blue") {
		particlesSquares.colorAnimation = [Color.blue, Color.blue, Color.blue, Color.blue, Color.blue];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.blue, Color.white, Color.blue, Color.blue];
		//splashBonusParticlesAnimator2.colorAnimation = [Color.white, Color.blue, Color.white, Color.blue, Color.blue];
	}
	else if (PlayerPrefs.GetString("Color") == "Yellow") {
		particlesSquares.colorAnimation = [Color.yellow, Color.yellow, Color.yellow, Color.yellow, Color.yellow];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.yellow, Color.white, Color.blue, Color.yellow];
		//splashBonusParticlesAnimator2.colorAnimation = [Color.white, Color.yellow, Color.white, Color.blue, Color.yellow];
	}
	else if (PlayerPrefs.GetString("Color") == "Cyan") {
		particlesSquares.colorAnimation = [Color.cyan, Color.cyan, Color.cyan, Color.cyan, Color.cyan];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.cyan, Color.white, Color.cyan, Color.cyan];
		//splashBonusParticlesAnimator2.colorAnimation = [Color.white, Color.cyan, Color.white, Color.cyan, Color.cyan];
	}
	else if (PlayerPrefs.GetString("Color") == "Magenta") {
		particlesSquares.colorAnimation = [Color.magenta, Color.magenta, Color.magenta, Color.magenta, Color.magenta];
		//splashBonusParticlesAnimator1.colorAnimation = [Color.white, Color.magenta, Color.white, Color.magenta, Color.magenta];
		//splashBonusParticlesAnimator2.colorAnimation = [Color.white, Color.magenta, Color.white, Color.magenta, Color.magenta];
	}
}

// set the difficulty level from toggle from OptionsScene.js script; affects the speed of the ball
function SetDifficulty() {
	if (PlayerPrefs.GetString("Difficulty") == "") {
		PlayerPrefs.SetString("Difficulty", "Normal");
	}
	var xPush : int = 4;
	var modifier: int = 0;
	if (Random.Range(0,2) == 0) { xPush *= -1; }
	if (PlayerPrefs.GetString("Difficulty") == "Easy") {
		// move 4 x and 4 y and 0 z, .Impulse means pushed just once... works because there is no resistance)
		ball.rigidbody.AddForce(xPush, 4, 0, ForceMode.Impulse);
		scoreModifier = 1;
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Normal") {
		modifier = 2;
		if (xPush > 0 ) { xPush += modifier; } else { xPush -= modifier; }
		ball.rigidbody.AddForce(xPush, 6, 0, ForceMode.Impulse);
		scoreModifier = 2;
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Hard") {
		modifier = 4;
		if (xPush > 0 ) { xPush += modifier; } else { xPush -= modifier; }
		ball.rigidbody.AddForce(xPush, 8, 0, ForceMode.Impulse);
		scoreModifier = 3;
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Very Hard") {
		modifier = 6;
		if (xPush > 0 ) { xPush += modifier; } else { xPush -= modifier; }
		ball.rigidbody.AddForce(xPush, 10, 0, ForceMode.Impulse);
		scoreModifier = 4;
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Ironic") {
		modifier = -1;
		if (xPush > 0 ) { xPush += modifier; } else { xPush -= modifier; }
		ball.rigidbody.AddForce(xPush, 2, 0, ForceMode.Impulse);
		scoreModifier = 5;
	}
}

// piano music
function InitiateMusic() {
	if (PlayerPrefs.GetString("Music") == "Music Off") {
		pianoMusic.enabled = false;
	}
}

// thunder sounds
function Thunder() {
	if (thunderCounter % 2 == 0) {
		thunderSound.volume = 0.5;
	}
	else {
		thunderSound.volume = 1;
	}
	if (PlayerPrefs.GetString("Rain") == "Rain On") {
		thunderSound.Play();
		thunderCounter += 1;
	}
}

// flash the screen white
function Flash() {
    flashObject.renderer.enabled = true;
    Invoke("CancelFlash", 0.05);
}
// cancel function used by Flash
function CancelFlash () {
    flashObject.renderer.enabled = false;
}

// shrink the player's paddle for a few seconds
function ShrinkPaddle() {
	if (PlayerPrefs.GetString("Paddle") == "Round") { paddleObject.transform.localScale -= Vector3(0.3,0.3,0.3); }
	else {paddleObject.transform.localScale -= Vector3(0.3,0,0); }
	Invoke("CancelShrink", 8);
}
// cancel function used by Shrink
function CancelShrink () {
    if (PlayerPrefs.GetString("Paddle") == "Round") { paddleObject.transform.localScale += new Vector3(0.3,0.3,0.3); }
    else { paddleObject.transform.localScale += new Vector3(0.3,0,0); }
}

// start or stop rain sound depending on toggle set in options menu
// references a static variable in the OptionsScene.js script
function InitiateRain() {
	if (PlayerPrefs.GetString("Rain") == "") {
		PlayerPrefs.SetString("Rain", "Rain On");
	}
	if (PlayerPrefs.GetString("Rain") == "Rain Off") {
		//rainSound.Stop();
		rainParticles.enabled = false;
		splashPaddleParticles.enabled = false;
		splashBonusParticles1.enabled = false;
		splashBonusParticles2.enabled = false;
		rainSound.enabled = false;
	}
	else {
		//rainSound.Play();
		rainParticles.enabled = true;
		splashPaddleParticles.enabled = true;
		splashBonusParticles1.enabled = true;
		splashBonusParticles2.enabled = true;
		rainSound.enabled = true;
	}
}

// Updates the score every time it's run
function UpdateScore() {
	score += 1 * scoreModifier;
	score3DText.text = "Score: " + score.ToString();
}

// Updates the time every time it's run
function UpdateTime() {
	time -= 1;
	if (time == 0) {
		if (PlayerPrefs.GetString("Mode") == "Classic") {
			score += 333 * scoreModifier;
			GameOver();
		}
		else { // reset particles, music, and time for infinite mode
			pianoMusic.Play();
			rainParticles.minEmission = 50;
			rainParticles.maxEmission = 50;
			splashPaddleParticles.minEmission = 10;
			splashPaddleParticles.maxEmission = 10;
			splashBonusParticles1.minEmission = 10;
			splashBonusParticles1.maxEmission = 10;
			splashBonusParticles2.minEmission = 10;
			splashBonusParticles2.maxEmission = 10;
			rainSound.volume = 0.4;
			// increase the speed of the ball if difficulty is ironic
			if (PlayerPrefs.GetString("Difficulty") == "Ironic") { ball.rigidbody.velocity *= 0.5; }
			time = 60;
			roundCount += 1;
		}
	}
	if (PlayerPrefs.GetString("Mode") == "Classic") {
		time3DText.text = "Time: " + time.ToString();
	}	
	else {
		time3DText.text = "Rounds: " + roundCount;
	}
}

// music gets gradually louder
function IncreaseRainVolume() {
	//Debug.Log(music.volume); // print to console
	rainSound.volume += 0.01;
}

// rain gets heavier = more particles
function IncreaseRainParticles() {
	//Debug.Log("Rain Drops: " + rainParticles.minEmission);
	rainParticles.minEmission += 5;
	rainParticles.maxEmission += 5;
	splashPaddleParticles.minEmission += 3;
	splashPaddleParticles.maxEmission += 3;
	splashBonusParticles1.minEmission += 1;
	splashBonusParticles1.maxEmission += 1;
	splashBonusParticles2.minEmission += 1;
	splashBonusParticles2.maxEmission += 1;
}

// called from BonusAreatDetectionBox.js inside OnTriggerEnter()
function AddScoreForBonusArea() {
	score += 50 * scoreModifier;
	goals += 1; // add 1 to goals counter
}

// called when player runs out of time or loses ball
function GameOver() {
	gameCount += 1;
	yourScore = score;
	if (score > PlayerPrefs.GetInt("highScore")) {
		PlayerPrefs.SetInt("highScore", score);
		lossCount = 0;
		winCount += 1;
		winToggle = true;
	}
	else {
		winToggle = false;
		winCount = 0;
		lossCount += 1;
	}
	ball.rigidbody.collisionDetectionMode = CollisionDetectionMode.Discrete; // reset collision detection
	Application.LoadLevel("winLose");
}

// randomly changes the place of the bonus target
function ChangeBonusTarget() {
	//var limitMin:Vector3 = Camera.main.ScreenToWorldPoint(Vector3(0, 0, Camera.main.transform.position.y));
    //var limitMax:Vector3 = Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, Camera.main.transform.position.y));
	//bonusGate.transform.position.x = Random.Range(limitMin.x + 1, limitMax.x - 1);
	//bonusGate.transform.position.y = Random.Range(limitMin.y + 4.5, limitMax.y - 2.5);
	var maxX : Vector3 = wallTop.renderer.bounds.size;
	var maxY : Vector3 = wallLeft.renderer.bounds.size;
	bonusGate.transform.position.x = Random.Range(0 - maxX.x * 0.375, maxX.x * 0.375);
	bonusGate.transform.position.y = Random.Range(0 - maxY.y * 0.1, maxY.y * 0.4);
}
