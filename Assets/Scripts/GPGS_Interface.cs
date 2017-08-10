using UnityEngine;
using System.Collections;

public class GPGS_Interface: MonoBehaviour {

	private Ray ray;
	private RaycastHit hit;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
		#if UNITY_ANDROID || UNITY_IOS
		if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Ended) {
			ray = Camera.main.ScreenPointToRay(Input.GetTouch (0).position);
			if (Physics.Raycast(ray, out hit)) {
				if (hit.transform.gameObject.name == "LeaderboardsButton") {
					Debug.Log ("Leaderboards Button");
					GPGSManager.ShowLeaderboardsUI();
				}
				if (hit.transform.gameObject.name == "AchievementsButton") {
					Debug.Log ("Achievements Button");
					GPGSManager.ShowAchievementsUI();
				}
			}
		}
		#endif

		#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE
		if (Input.GetMouseButtonDown(0)) {
			ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			if (Physics.Raycast(ray, out hit)) {
				if (hit.transform.gameObject.name == "LeaderboardsButton") {
					Debug.Log ("Leaderboards Button");
					GPGSManager.ShowLeaderboardsUI();
				}
				if (hit.transform.gameObject.name == "AchievementsButton") {
					Debug.Log ("Achievements Button");
					GPGSManager.ShowAchievementsUI();
				}
			}
		}
		#endif
	}
}
