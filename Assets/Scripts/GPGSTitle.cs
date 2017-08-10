using UnityEngine;
using System.Collections;

public class GPGSTitle : MonoBehaviour {

	// Use this for initialization
	void Start () {
		#if UNITY_ANDROID
		GPGSManager.InitializeGooglePlayGames ();
		#endif
	}
	
	// Update is called once per frame
	void Update () {

	}
}
