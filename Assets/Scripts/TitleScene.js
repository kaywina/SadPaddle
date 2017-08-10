#pragma strict

private var ray : Ray;
private var rayCastHit : RaycastHit;
var times : Material;

function Awake () {
	Screen.showCursor = true;
	OptionsScene.setTimes(times);
	OptionsScene.times = times;
	OptionsScene.setColor();
}
static function SetPlayerPrefDefaults() {
	//PlayerPrefs.DeleteAll(); //enable to reset playerprefs
	if (PlayerPrefs.GetString("Mode") == "") { PlayerPrefs.SetString("Mode", "Infinite"); }
	if (PlayerPrefs.GetString("Music") == "") { PlayerPrefs.SetString("Music", "Music On"); }
	if (PlayerPrefs.GetString("Difficulty") == "") { PlayerPrefs.SetString("Difficulty", "Normal"); }
	if (PlayerPrefs.GetString("Rain") == "") { PlayerPrefs.SetString("Rain", "Rain On"); }
	if (PlayerPrefs.GetString("Paddle") == "") { PlayerPrefs.SetString("Paddle", "Round"); }
	if (PlayerPrefs.GetString("Control") == "") { PlayerPrefs.SetString("Control", "Touch"); }
	if (PlayerPrefs.GetString("Color") == "") { PlayerPrefs.SetString("Color", "White"); }
}

function Update () {

	#if UNITY_ANDROID || UNITY_IOS
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Ended) {
		ray = Camera.main.ScreenPointToRay(Input.GetTouch (0).position);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "ClickToContinue") { //load menu
				Application.LoadLevel("mainMenu");
			}
		}
	}
	#endif

	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE
	if (Input.GetMouseButtonDown(0)) {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "ClickToContinue") { //load menu
				Application.LoadLevel("mainMenu");
			}
		}
	}
	#endif
	
	if (Input.GetKeyUp ("space")) {
    	Application.LoadLevel("mainMenu");
        //Debug.Log("enter");
    }
	if (Input.GetKeyUp ("return")) {
    	Application.LoadLevel("mainMenu");
        //Debug.Log("return");
    }
    if (Input.GetKeyUp ("enter")) {
    	Application.LoadLevel("mainMenu");
        //Debug.Log("enter");
    }
    if (Input.GetKey ("escape")) {
        //Debug.Log("escape");
        Application.Quit();
    }
}
