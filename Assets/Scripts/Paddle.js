#pragma strict

private var ray : Ray;
private var rayCastHit : RaycastHit;
private var maxX: Vector3;

function Awake () {
	maxX = MainGame.wallTop.renderer.bounds.size;
}

function Update () {
	/*
	if (Input.GetMouseButton(0)) {
		 // TOUCH INPUT FOR SMARTPHONE/TABLET
		// get point selected on screen
		ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		
		// if a point is selected, move the paddle to that point
		if (Physics.Raycast (ray, rayCastHit)) {
			//Debug.Log(maxX.x); 
			if (rayCastHit.point.x > 0 - maxX.x * 0.4 && rayCastHit.point.x < maxX.x * 0.4) { // limits horizontal movement
				transform.position.x = rayCastHit.point.x;
			}
		}
	*/
	
	#if UNITY_ANDROID || UNITY_IOS
	
	if(Input.touchCount > 0 && Input.GetTouch(0) != null) {
		ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
		if (Physics.Raycast (ray, rayCastHit)) {
			//Debug.Log(maxX.x);
			// MOUSE INPUT FOR PC/MAC and Tap Input for Android/iOs
				if (PlayerPrefs.GetString("Control") == "Touch") {
					// if a point is selected, move the paddle to that point (with limits!)
					if (rayCastHit.point.x > 0 - maxX.x * 0.34 && rayCastHit.point.x < maxX.x * 0.34) { // limits horizontal movement
						transform.position.x = rayCastHit.point.x;
					}
				}
				// All users can quit
				if (rayCastHit.transform.name == "QuitButton") { //load game
						Application.LoadLevel("mainMenu");
					}
			}
			if (PlayerPrefs.GetString("Control") == "Tilt") {
				if (transform.position.x > 0 - maxX.x * 0.4 && transform.position.x < maxX.x * 0.4) {
					var dir : Vector3 = Vector3.zero;
		    		dir.x = Input.acceleration.x*.7;
		    		transform.position.x += dir.x;
		    	}
		    	else {
		    		if (transform.position.x > 0 - maxX.x * 0.375) {
		    			transform.position.x -= 0.025;
		    		}
		    		else if (transform.position.x < maxX.x * 0.375) {
		    			transform.position.x += 0.025;
		    		}
		    	}
		    }
	   }
	#endif
	
	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE	
	ray = Camera.main.ScreenPointToRay (Input.mousePosition);	
	Debug.Log("Mouse");
	if (Physics.Raycast (ray, rayCastHit)) {
		// if a point is selected, move the paddle to that point (with limits!)
		if (PlayerPrefs.GetString("Control") == "Touch") {
			if (transform.position.x > -3 && transform.position.x < 3 &&
				rayCastHit.point.x > -3 && rayCastHit.point.x < 3
				) { // limits horizontal movement
				transform.position.x = rayCastHit.point.x;
			}
		}
		
		
		/*
		if (transform.position.x > 0 - maxX.x * 0.33) { // limits horizontal movement
			transform.position.x = rayCastHit.point.x;
		}
		else if (transform.position.x < maxX.x * 0.33) {
			transform.position.x = rayCastHit.point.x;
		}
		*/
		// All users can quit
		if (Input.GetMouseButtonUp(0) && rayCastHit.transform.name == "QuitButton") { //load game
			Application.LoadLevel("mainMenu");
		}
	}
	
	/*
	if (PlayerPrefs.GetString("Control") == "Tilt") {
		if (transform.position.x > 0 - maxX.x * 0.4 && transform.position.x < maxX.x * 0.4) {
			var dir2 : Vector3 = Vector3.zero;
    		dir2.x = Input.acceleration.x*.7;
    		transform.position.x += dir2.x;
    	}
    	else {
    		if (transform.position.x > 0 - maxX.x * 0.375) {
    			transform.position.x -= 0.025;
    		}
    		else if (transform.position.x < maxX.x * 0.375) {
    			transform.position.x += 0.025;
    		}
    	}
    }
    */
    
    if (PlayerPrefs.GetString("Control") == "Tilt") {
    	if (Input.GetKey (KeyCode.LeftArrow)) {
    		if (transform.position.x > 0 - maxX.x * 0.315) {
    			transform.position.x -= 0.1;
    		}
    	}
    	if (Input.GetKey (KeyCode.RightArrow)) {
    		if (transform.position.x < maxX.x * 0.313) {
    			transform.position.x += 0.1;
    		}
    	}
    }
    
    #endif
    
    if (Input.GetKey("escape")) {
        	//Debug.Log("escape");
        Application.LoadLevel("mainMenu");
    }
	
}