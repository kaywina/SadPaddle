#pragma strict

private var ray : Ray;
private var rayCastHit : RaycastHit;
var yourScore3DText: TextMesh;
var highScore3DText : TextMesh;
var winLose3DText: TextMesh;
var paddle: GameObject;

function Awake () {
	Screen.showCursor = true; // do not show mouse cursor
	OptionsScene.setColor();
	paddle = GameObject.Find("PaddleRounded");
	if (MainGame.winToggle == true) {
		winLose3DText.text += " Win!";
		paddle.transform.localScale.y = 1;
		paddle.transform.localPosition.y = -0.75;
	}
	else {
		winLose3DText.text += " Lose!";
		paddle.transform.localScale.y = -1;
		paddle.transform.localPosition.y = 0.25;
	}
	yourScore3DText.text += MainGame.yourScore.ToString();
	highScore3DText.text = "High score: " + PlayerPrefs.GetInt("highScore").ToString();
}


function Update () {

    if (Input.GetKeyUp ("space")) {
    	Application.LoadLevel("mainMenu");
        //Debug.Log("space");
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
        Application.LoadLevel("mainMenu");
    }
	
	if (Input.GetMouseButtonDown(0)) {
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, rayCastHit)) {
			if (rayCastHit.transform.name == "ContinueButton") { //load menu
				Application.LoadLevel("mainMenu");
			}
		}
	}
}

