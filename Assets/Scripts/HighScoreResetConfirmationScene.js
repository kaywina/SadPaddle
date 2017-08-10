#pragma strict

private var ray : Ray;
private var rayCastHit : RaycastHit;
var yesButton: TextMesh;
var noButton: TextMesh;
private var posTrigger: int;

function Awake () {
	Screen.showCursor = true;
	OptionsScene.setColor();
}

function Update () {
	
	#if UNITY_ANDROID || UNITY_IOS
	// code for hovering
	if(Input.touchCount > 0 && Input.GetTouch(0) != null) {
		ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "YesButton") { //load menu
				posTrigger = 0;
				boldToggle();
			}
			if (rayCastHit.transform.name == "NoButton") { //load menu
				posTrigger = 1;
				boldToggle();
			}
		}
	}

	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Ended) {
		ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "YesButton") { //load menu
				posTrigger = 0;
				boldToggle();
				PlayerPrefs.SetInt("highScore", 0);
				Application.LoadLevel("mainMenu");		
			}
			if (rayCastHit.transform.name == "NoButton") { //load menu
				posTrigger = 1;
				boldToggle();
				Application.LoadLevel("mainMenu");
			}
		}
	}
	#endif
	
	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE
	// code for hovering
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ray, rayCastHit)) {
		if (rayCastHit.transform.name == "YesButton") { //load menu
			posTrigger = 0;
			boldToggle();
		}
		if (rayCastHit.transform.name == "NoButton") { //load menu
			posTrigger = 1;
			boldToggle();
		}
	}

	if (Input.GetMouseButtonDown(0)) {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "YesButton") { //load menu
				posTrigger = 0;
				boldToggle();
				PlayerPrefs.SetInt("highScore", 0);
				Application.LoadLevel("mainMenu");		
			}
			if (rayCastHit.transform.name == "NoButton") { //load menu
				posTrigger = 1;
				boldToggle();
				Application.LoadLevel("mainMenu");
			}
		}
	}
	#endif
	
	// Code for menu cycling with keyboard
	if (posTrigger < 0) { posTrigger = 0; }
	if (posTrigger > 1) { posTrigger = 1; }
	boldToggle();
		
	if (Input.GetKeyUp ("up")) {
		posTrigger -= 1;
		//Debug.Log("up");
    }
    if (Input.GetKeyUp ("down")) {
    	posTrigger += 1;
        //Debug.Log("down");
    }
    if (Input.GetKeyUp ("left")) {
    	posTrigger -= 1;
        //Debug.Log("down");
    }
    if (Input.GetKeyUp ("right")) {
    	posTrigger += 1;
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
        Application.LoadLevel("mainMenu");
    }
}

function boldToggle() {
	if (posTrigger == 0) { 
		yesButton.fontStyle = 1;
		noButton.fontStyle = 0;
	}
	if (posTrigger == 1) { 
		yesButton.fontStyle = 0;
		noButton.fontStyle = 1;
	}
}

function selectWithKey() {
	if (posTrigger == 0) { PlayerPrefs.SetInt("highScore", 0); Application.LoadLevel("mainMenu"); }
	if (posTrigger == 1) { Application.LoadLevel("mainMenu"); }
}