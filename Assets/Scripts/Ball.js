#pragma strict

// not private so we can access these variables from inspector

var mainGameScript : MainGame;

var particlesSplash : GameObject;

// run every time scene awakes
function Awake() {
	// delays (Invoke) and repeats (InvokeRepeating) increase velocity after 2 seconds, then every 2 seconds after
	if (PlayerPrefs.GetString("Difficulty") == "Ironic") {
		InvokeRepeating("IncreaseBallVelocity", 1, 1);
	}
}

function Update() {
	// game over
	if (transform.position.y < -3.5) {
		//Application.LoadLevel("menu"); // old way
		mainGameScript.GameOver(); // new better way, scripts kepts in MainGame
	}
}

// increases the speed of the ball
function IncreaseBallVelocity() {
	rigidbody.velocity *= 1.03; // same as rigidbody.velocity = rigidbody.velocity * 1.05
	//Debug.Log("velocity: " + rigidbody.velocity); // print to console debug feedback
}

// on collision instantiate a set of sparks at the position of the ball
function OnCollisionEnter(collision : Collision) {
	Instantiate(particlesSplash, transform.position, transform.rotation);
	audio.Play();
}