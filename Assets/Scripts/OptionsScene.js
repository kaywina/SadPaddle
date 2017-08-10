private var ray : Ray;
private var rayCastHit : RaycastHit;

// Fonts
public static var times: Material;

// 3D Text Meshes
var timesToSet: Material;
var music3DText: TextMesh;
var rain3DText: TextMesh;
var difficulty3DText: TextMesh;
var back3DText: TextMesh;
var mode3DText: TextMesh;
var paddle3DText: TextMesh;
var color3DText: TextMesh;
var warning3DText: TextMesh;
var reset3DText: TextMesh;
var control3DText: TextMesh;

// Piano Soiunds
var piano_sound_b1: AudioSource;
var piano_sound_a2: AudioSource;
var piano_sound_g3: AudioSource;
var piano_sound_f4: AudioSource;
var piano_sound_e5: AudioSource;
var piano_sound_c6: AudioSource;
var piano_sound_d55: AudioSource;

// Menu controllers
private var posTrigger: int;
private var count: int; // used as a hack to stop tapping in mainmenu from selecting something when user first enters this screen

public function getTimes() {
	return times;
}

public static function setTimes(toSet) {
	times = toSet;
}


function Awake () {
	setTimes(timesToSet);
	Screen.showCursor = true;
	count = 0;
	TitleScene.SetPlayerPrefDefaults();
	setColor();
	mode3DText.text = PlayerPrefs.GetString("Mode");
	music3DText.text = PlayerPrefs.GetString("Music");
	difficulty3DText.text = PlayerPrefs.GetString("Difficulty");
	rain3DText.text = PlayerPrefs.GetString("Rain");
	paddle3DText.text = PlayerPrefs.GetString("Paddle");
	#if UNITY_ANDROID || UNITY_IOS
	control3DText.text = PlayerPrefs.GetString("Control");
	#endif
	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE	
	if (PlayerPrefs.GetString("Control") == "Touch") {
		control3DText.text = "Mouse";
	}
	else {
		control3DText.text = "Keyboard";
	}
	#endif
	
	color3DText.text = PlayerPrefs.GetString("Color");
	
	
	
	if (color3DText.text == "Party") {
		warning3DText.renderer.enabled = true;
	}
}

function Update () {
	count += 1;
	if (count > 1000000000) { count = 0; }
	// Code for menu cycling with keyboard
	if (posTrigger < 0) { posTrigger = 0; }
	if (posTrigger > 8) { posTrigger = 8; }
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
		//Debug.Log("up");
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
    
    
    // HACK FOR DELAYING INPUT
    if (count > 5) {
    
	    #if UNITY_ANDROID || UNITY_IOS
	    	// Code for hovering
	    if(Input.touchCount > 0 && Input.GetTouch(0) != null) {
			ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
			if (Physics.Raycast(ray, rayCastHit)) {
				if (rayCastHit.transform.name == "ModeButton") {
					posTrigger = 0;
					boldToggle();
				}
				if (rayCastHit.transform.name == "MusicButton") {
					posTrigger = 1;
					boldToggle();
				}
				if (rayCastHit.transform.name == "RainButton") {
					posTrigger = 2;
					boldToggle();
				}
				if (rayCastHit.transform.name == "DifficultyButton") {
					posTrigger = 3;
					boldToggle();
				}
				if (rayCastHit.transform.name == "PaddleButton") {
					posTrigger = 4;
					boldToggle();
				}
				if (rayCastHit.transform.name == "ControlButton") {
					posTrigger = 5;
					boldToggle();
				}
				if (rayCastHit.transform.name == "ColorButton") {
					posTrigger = 6;
					boldToggle();
				}
				if (rayCastHit.transform.name == "BackButton") {
					posTrigger = 7;
					boldToggle();
				}	
				if (rayCastHit.transform.name == "ResetButton") {
					posTrigger = 8;
					boldToggle();
				}	
			}
		}
		
		// Code for mouseclick/tap input
		if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Ended) {
			ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
			if (Physics.Raycast(ray, rayCastHit)) {
				if (rayCastHit.transform.name == "ModeButton") { // toggle music
					posTrigger = 0;
					boldToggle();
					piano_sound_b1.Play();
					changeMode();
				}
				if (rayCastHit.transform.name == "MusicButton") { // toggle music
					posTrigger = 1;
					boldToggle();
					piano_sound_a2.Play();
					changeMusic();
				}
				if (rayCastHit.transform.name == "RainButton") { // toggle rain
					posTrigger = 2;
					boldToggle();
					piano_sound_g3.Play();
					changeRain();
				}
				if (rayCastHit.transform.name == "DifficultyButton") { // toggle rain
					posTrigger = 3;
					boldToggle();
					piano_sound_f4.Play();
					changeDifficulty();
				}
				if (rayCastHit.transform.name == "PaddleButton") { // toggle rain
					posTrigger = 4;
					boldToggle();
					piano_sound_e5.Play();
					changePaddle();
				}
				if (rayCastHit.transform.name == "ControlButton") { // toggle control type
					posTrigger = 5;
					boldToggle();
					piano_sound_d55.Play();
					changeControl();
				}
				if (rayCastHit.transform.name == "ColorButton") { // toggle color
					posTrigger = 6;
					boldToggle();
					piano_sound_c6.Play();
					changeColor();
				}
				if (rayCastHit.transform.name == "BackButton") { //load main menu
					posTrigger = 7;
					boldToggle();
					PlayerPrefs.Save();
					Application.LoadLevel("mainMenu");
				}	
				if (rayCastHit.transform.name == "ResetButton") { //reset options
					posTrigger = 8;
					boldToggle();
					resetPrefs();
				}	
			}
		}
	    #endif
	    
	    
	    #if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE
		// Code for hovering
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "ModeButton") {
				posTrigger = 0;
				boldToggle();
			}
			if (rayCastHit.transform.name == "MusicButton") {
				posTrigger = 1;
				boldToggle();
			}
			if (rayCastHit.transform.name == "RainButton") {
				posTrigger = 2;
				boldToggle();
			}
			if (rayCastHit.transform.name == "DifficultyButton") {
				posTrigger = 3;
				boldToggle();
			}
			if (rayCastHit.transform.name == "PaddleButton") {
				posTrigger = 4;
				boldToggle();
			}
			if (rayCastHit.transform.name == "ControlButton") {
				posTrigger = 5;
				boldToggle();
			}
			if (rayCastHit.transform.name == "ColorButton") {
				posTrigger = 6;
				boldToggle();
			}
			if (rayCastHit.transform.name == "BackButton") {
				posTrigger = 7;
				boldToggle();
			}	
			if (rayCastHit.transform.name == "ResetButton") {
				posTrigger = 8;
				boldToggle();
			}	
		}
		
		// Code for mouseclick/tap input
		if (Input.GetMouseButtonUp(0)) {
			ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			if (Physics.Raycast(ray, rayCastHit)) {
				if (rayCastHit.transform.name == "ModeButton") { // toggle music
					posTrigger = 0;
					boldToggle();
					piano_sound_b1.Play();
					changeMode();
				}
				if (rayCastHit.transform.name == "MusicButton") { // toggle music
					posTrigger = 1;
					boldToggle();
					piano_sound_a2.Play();
					changeMusic();
				}
				if (rayCastHit.transform.name == "RainButton") { // toggle rain
					posTrigger = 2;
					boldToggle();
					piano_sound_g3.Play();
					changeRain();
				}
				if (rayCastHit.transform.name == "DifficultyButton") { // toggle rain
					posTrigger = 3;
					boldToggle();
					piano_sound_f4.Play();
					changeDifficulty();
				}
				if (rayCastHit.transform.name == "PaddleButton") { // toggle rain
					posTrigger = 4;
					boldToggle();
					piano_sound_e5.Play();
					changePaddle();
				}
				if (rayCastHit.transform.name == "ControlButton") { // toggle control type
					posTrigger = 5;
					boldToggle();
					piano_sound_d55.Play();
					changeControl();
				}
				if (rayCastHit.transform.name == "ColorButton") { // toggle color
					posTrigger = 6;
					boldToggle();
					piano_sound_c6.Play();
					changeColor();
				}
				if (rayCastHit.transform.name == "BackButton") { //load main menu
					posTrigger = 7;
					boldToggle();
					PlayerPrefs.Save();
					Application.LoadLevel("mainMenu");
				}	
				if (rayCastHit.transform.name == "ResetButton") { //reset options
					posTrigger = 8;
					boldToggle();
					resetPrefs();
				}	
			}
		}
			#endif
	} // end count loop
}

// used to determine which menu item is highlighted
function boldToggle() {
	if (posTrigger == 0) { 
		mode3DText.fontStyle = 1;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
	}
	if (posTrigger == 1) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 1;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
	}
	if (posTrigger == 2) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 1;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
	}
	if (posTrigger == 3) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 1;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
	}
	if (posTrigger == 4) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 1;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
	}
	if (posTrigger == 5) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 1;
		color3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
	}
	if (posTrigger == 6) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 1;
		back3DText.fontStyle = 0;
		reset3DText.fontStyle = 0;
	}
	if (posTrigger == 7) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		back3DText.fontStyle = 1;
		reset3DText.fontStyle = 0;
	}
	if (posTrigger == 8) { 
		mode3DText.fontStyle = 0;
		music3DText.fontStyle = 0;
		rain3DText.fontStyle = 0;
		difficulty3DText.fontStyle = 0;
		paddle3DText.fontStyle = 0;
		control3DText.fontStyle = 0;
		color3DText.fontStyle = 0;
		back3DText.fontStyle = 0;
		reset3DText.fontStyle = 1;
	}
	
}

// used for keyboard menu input
function selectWithKey() {
	if (posTrigger == 0) { piano_sound_b1.Play(); changeMode(); }
	if (posTrigger == 1) { piano_sound_a2.Play(); changeMusic(); }
	if (posTrigger == 2) { piano_sound_g3.Play(); changeRain(); }
	if (posTrigger == 3) { piano_sound_f4.Play(); changeDifficulty(); }
	if (posTrigger == 4) { piano_sound_e5.Play(); changePaddle(); }
	if (posTrigger == 5) { piano_sound_d55.Play(); changeControl(); }
	if (posTrigger == 6) { piano_sound_c6.Play(); changeColor(); }
	if (posTrigger == 7) { Application.LoadLevel("mainMenu"); }
	if (posTrigger == 8) { resetPrefs(); }
}

// menu function to change control input method
function changeControl() {
	if (PlayerPrefs.GetString("Control") == "Touch") {
		PlayerPrefs.SetString("Control", "Tilt");
		#if UNITY_ANDROID || UNITY_IOS
		control3DText.text = "Tilt";
		#endif
		#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE	
		control3DText.text = "Keyboard";
		#endif
	}
	else if (PlayerPrefs.GetString("Control") == "Tilt") {
		PlayerPrefs.SetString("Control", "Touch");
		#if UNITY_ANDROID || UNITY_IOS
		control3DText.text = "Touch";
		#endif
		#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE	
		control3DText.text = "Mouse";
		#endif
	}
	//control3DText.text = PlayerPrefs.GetString("Control");
}

// menu function for reset preferences
function resetPrefs() {
	PlayerPrefs.SetString("Mode", "Classic");
	PlayerPrefs.SetString("Music", "Music On");
	PlayerPrefs.SetString("Difficulty", "Normal");
	PlayerPrefs.SetString("Rain", "Rain On");
	PlayerPrefs.SetString("Paddle", "Round");
	PlayerPrefs.SetString("Control", "Touch");
	PlayerPrefs.SetString("Color", "White");
	PlayerPrefs.Save();
	Application.LoadLevel("optionsMenu");
}

// menu function for selecting color
function changeColor() {
	if (PlayerPrefs.GetString("Color") == "White") {
		PlayerPrefs.SetString("Color", "Green");
	}
	else if (PlayerPrefs.GetString("Color") == "Green") {
		PlayerPrefs.SetString("Color", "Red");
	}
	else if (PlayerPrefs.GetString("Color") == "Red") {
		PlayerPrefs.SetString("Color", "Blue");
	}
	else if (PlayerPrefs.GetString("Color") == "Blue") {
		PlayerPrefs.SetString("Color", "Yellow");
	}
	else if (PlayerPrefs.GetString("Color") == "Yellow") {
		PlayerPrefs.SetString("Color", "Cyan");
	}
	else if (PlayerPrefs.GetString("Color") == "Cyan") {
		PlayerPrefs.SetString("Color", "Magenta");
	}
	else if (PlayerPrefs.GetString("Color") == "Magenta") {
		PlayerPrefs.SetString("Color", "Orange");		
	}
	else if (PlayerPrefs.GetString("Color") == "Orange") {
		PlayerPrefs.SetString("Color", "Purple");
	}
	else if (PlayerPrefs.GetString("Color") == "Purple") {
		PlayerPrefs.SetString("Color", "Party");
		warning3DText.renderer.enabled = true;
	}
	else if (PlayerPrefs.GetString("Color") == "Party") {
		PlayerPrefs.SetString("Color", "White");
		warning3DText.renderer.enabled = false;
	}
	setColor();
	color3DText.text = PlayerPrefs.GetString("Color");
}

// used by changeColor to adjust color of overall scene light
public static function setColor() {

	if (PlayerPrefs.GetString("Color") == "White") {
		RenderSettings.ambientLight = Color.white;
		times.color = Color.white;		
	}
	else if (PlayerPrefs.GetString("Color") == "Green") {
		RenderSettings.ambientLight = Color.green;
		times.color = Color.green;	
	}
	else if (PlayerPrefs.GetString("Color") == "Red") {
		RenderSettings.ambientLight = Color.red;
		times.color = Color.red;
	}
	else if (PlayerPrefs.GetString("Color") == "Blue") {
		RenderSettings.ambientLight = Color.blue;
		times.color = Color.blue;
	}
	else if (PlayerPrefs.GetString("Color") == "Yellow") {
		RenderSettings.ambientLight = Color.yellow;
		times.color = Color.yellow;
	}
	else if (PlayerPrefs.GetString("Color") == "Cyan") {
		RenderSettings.ambientLight = Color.cyan;
		times.color = Color.cyan;
	}
	else if (PlayerPrefs.GetString("Color") == "Magenta") {
		RenderSettings.ambientLight = Color.magenta;
		times.color = Color.magenta;
	}
	else if (PlayerPrefs.GetString("Color") == "Orange") {
		RenderSettings.ambientLight = Color(1, 0.5, 0);
		times.color = Color(1, 0.5, 0);
	}
	else if (PlayerPrefs.GetString("Color") == "Purple") {
		RenderSettings.ambientLight = Color(0.5, 0, 1);
		times.color = Color(0.5, 0, 1);
	}
	else if (PlayerPrefs.GetString("Color") == "Party") {
		RenderSettings.ambientLight = Color.white;
		times.color = Color.white;
	}
}

// menu function for selecting the mode
function changePaddle() {
	if (PlayerPrefs.GetString("Paddle") == "Round") {
		paddle3DText.text = "Flat";
		PlayerPrefs.SetString("Paddle", "Flat");
	}
	else {
		paddle3DText.text = "Round";
		PlayerPrefs.SetString("Paddle", "Round");
	}
}

// menu function for selecting the mode
function changeMode() {
	if (PlayerPrefs.GetString("Mode") == "Classic") {
		mode3DText.text = "Infinite";
		PlayerPrefs.SetString("Mode", "Infinite");
	}
	else {
		mode3DText.text = "Classic";
		PlayerPrefs.SetString("Mode", "Classic");
	}
}

// menu function for selecting the music option
function changeMusic() {
	if (PlayerPrefs.GetString("Music") == "Music On") {
		music3DText.text = "Music Off";
		PlayerPrefs.SetString("Music", "Music Off");
	}
	else {
		music3DText.text = "Music On";
		PlayerPrefs.SetString("Music", "Music On");
	}
}

// menu function for selecting the rain option
function changeRain() {
	if (PlayerPrefs.GetString("Rain") == "Rain On") {
		rain3DText.text = "Rain Off";
		PlayerPrefs.SetString("Rain", "Rain Off");
	}
	else {
		rain3DText.text = "Rain On";
		PlayerPrefs.SetString("Rain", "Rain On");
	}
}

// menu function for selecting the difficulty option
function changeDifficulty() {
	if (PlayerPrefs.GetString("Difficulty") == "Easy") {
		PlayerPrefs.SetString("Difficulty", "Normal");
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Normal") {
		PlayerPrefs.SetString("Difficulty", "Hard");
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Hard") {
		PlayerPrefs.SetString("Difficulty", "Very Hard");
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Very Hard") {
		PlayerPrefs.SetString("Difficulty", "Ironic");
	}
	else if (PlayerPrefs.GetString("Difficulty") == "Ironic") {
		PlayerPrefs.SetString("Difficulty", "Easy");
	}
	difficulty3DText.text = PlayerPrefs.GetString("Difficulty");
}