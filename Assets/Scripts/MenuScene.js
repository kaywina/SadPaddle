#pragma strict

// declare the raycast objects here so we don't need to instantiate them each frame

private var ray : Ray;
private var rayCastHit : RaycastHit;
var highScore3DText : TextMesh;
private var posTrigger : int;
var playButton : TextMesh;
var optionsButton : TextMesh;
var quitButton : TextMesh;
var highScoreButton: TextMesh;

function Awake () {
	Screen.showCursor = true;
	TitleScene.SetPlayerPrefDefaults();
	//Screen.showCursor = true; // do not show mouse cursor
	OptionsScene.setColor();
	highScore3DText.text = "High score: " + PlayerPrefs.GetInt("highScore").ToString();
	posTrigger = 0;
	boldToggle();
}

function Update () {

	// Code for menu cycling with keyboard
	if (posTrigger < 0) { posTrigger = 0; }
	if (posTrigger > 3) { posTrigger = 3; }
	boldToggle();

	if (Input.GetKeyUp ("up")) {
		posTrigger -= 1;
		boldToggle();
		//Debug.Log("up");
    }
    if (Input.GetKeyUp ("down")) {
    	posTrigger += 1;
    	boldToggle();
        //Debug.Log("down");
    }
    if (Input.GetKeyUp ("left")) {
		posTrigger -= 1;
		boldToggle();
		//Debug.Log("up");
    }
    if (Input.GetKeyUp ("right")) {
    	posTrigger += 1;
    	boldToggle();
        //Debug.Log("down");
    }
    if (Input.GetKeyUp ("space")) {
    	selectWithKey();
        //Debug.Log("space");
    }
    if (Input.GetKeyUp ("return")) {
    	selectWithKey();
        //Debug.Log("return");
    }
    if (Input.GetKeyUp ("enter")) {
    	selectWithKey();
        //Debug.Log("enter");
    }
    if (Input.GetKey ("escape")) {
        //Debug.Log("escape");
        Application.LoadLevel("titleCredits");
    }


	#if UNITY_ANDROID || UNITY_IOS
	// Code for hovering over options
	if(Input.touchCount > 0 && Input.GetTouch(0) != null) {
		ray = Camera.main.ScreenPointToRay(Input.GetTouch (0).position);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "PlayButton") {
				posTrigger = 0;
				boldToggle();
			}
			if (rayCastHit.transform.name == "OptionsButton") {
				posTrigger = 1;
				boldToggle();
			}
			if (rayCastHit.transform.name == "QuitButton") {
				posTrigger = 2;
				boldToggle();
			}
			if (rayCastHit.transform.name == "HighScore3DText") {
				posTrigger = 3;
				boldToggle();
			}
		}
	}

	// Code for mouseclick/tap input
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Ended) {
		ray = Camera.main.ScreenPointToRay(Input.GetTouch (0).position);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "PlayButton") { //load game
				posTrigger = 0;
				boldToggle();
				selectWithKey();
			}
			if (rayCastHit.transform.name == "OptionsButton") { // load options menu
				posTrigger = 1;
				boldToggle();
				selectWithKey();
			}
			if (rayCastHit.transform.name == "QuitButton") { // quit by tapping/clicking the word quit
				/*
				posTrigger = 2;
				boldToggle();
				selectWithKey();
				*/
				Application.LoadLevel("titleCredits");
				//System.Diagnostics.Process.GetCurrentProcess().Kill(); // works better on Android
			}
			if (rayCastHit.transform.name == "HighScore3DText") { // load options menu
				posTrigger = 3;
				boldToggle();
				selectWithKey();
			}
		}
	}
	#endif

	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE
	// Code for hovering over options
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ray, rayCastHit)) {
		if (rayCastHit.transform.name == "PlayButton") {
			posTrigger = 0;
			boldToggle();
		}
		if (rayCastHit.transform.name == "OptionsButton") {
			posTrigger = 1;
			boldToggle();
		}
		if (rayCastHit.transform.name == "QuitButton") {
			posTrigger = 2;
			boldToggle();
		}
		if (rayCastHit.transform.name == "HighScore3DText") {
			posTrigger = 3;
			boldToggle();
		}
	}

	// Code for mouseclick/tap input
	if (Input.GetMouseButtonDown(0)) {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "PlayButton") { //load game
				posTrigger = 0;
				boldToggle();
				selectWithKey();
			}
			if (rayCastHit.transform.name == "OptionsButton") { // load options menu
				posTrigger = 1;
				boldToggle();
				selectWithKey();
			}
			if (rayCastHit.transform.name == "QuitButton") { // quit by tapping/clicking the word quit
				/*
				posTrigger = 2;
				boldToggle();
				selectWithKey();
				*/
				Application.LoadLevel("titleCredits");
				//System.Diagnostics.Process.GetCurrentProcess().Kill(); // works better on Android
			}
			if (rayCastHit.transform.name == "HighScore3DText") { // load options menu
				posTrigger = 3;
				boldToggle();
				selectWithKey();
			}
		}
	}
	#endif
	
}

// used to determine which menu item is highlighted
function boldToggle() {
	if (posTrigger == 0) { 
		playButton.fontStyle = 1;
		optionsButton.fontStyle = 0;
		quitButton.fontStyle = 0;
		highScoreButton.fontStyle = 0;
	}
	if (posTrigger == 1) { 
		playButton.fontStyle = 0;
		optionsButton.fontStyle = 1;
		quitButton.fontStyle = 0;
		highScoreButton.fontStyle = 0;
	}
	if (posTrigger == 2) { 
		playButton.fontStyle = 0;
		optionsButton.fontStyle = 0;
		quitButton.fontStyle = 1;
		highScoreButton.fontStyle = 0;
	}
	if (posTrigger == 3) { 
		playButton.fontStyle = 0;
		optionsButton.fontStyle = 0;
		quitButton.fontStyle = 0;
		highScoreButton.fontStyle = 1;
	}
}

// used for keyboard menu input
function selectWithKey() {
	if (posTrigger == 0) { Application.LoadLevel("mainGame"); }
	if (posTrigger == 1) { Application.LoadLevel("optionsMenu"); }
	if (posTrigger == 2) { Application.LoadLevel("titleCredits"); } // sometimes crashes on pc build
	//if (posTrigger == 2) { System.Diagnostics.Process.GetCurrentProcess().Kill(); } // crash workaround, but quits Unity as well when testing in-
	if (posTrigger == 3) { Application.LoadLevel("resetHighScoreConfirmation"); }
}