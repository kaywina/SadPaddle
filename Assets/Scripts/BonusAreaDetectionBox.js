#pragma strict

var mainGameScript : MainGame;
var particlesSquares : GameObject;


// if ball collides with collision detectino box, add bonus score
function OnTriggerEnter (collision : Collider) {
	if (collision.transform.name == "Ball") {
		audio.Play();
		Instantiate(particlesSquares, transform.position, transform.rotation);
		mainGameScript.AddScoreForBonusArea();
	}
}