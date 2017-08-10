using UnityEngine;
using System.Collections;

public class GPGSWinLose : MonoBehaviour {

	// Use this for initialization
	void Start () {
		#if UNITY_ANDROID
		GPGSManager.SubmitLeaderboard ();
		GPGSManager.SubmitAchievements();
		#endif
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
