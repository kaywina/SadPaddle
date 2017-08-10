using UnityEngine;
using GooglePlayGames;
using GooglePlayGames.BasicApi;

static public class GPGSManager {
	
	public static void InitializeGooglePlayGames() {
		//Debug.Log ("Initalize GPGS");
		// recommended for debugging:
		PlayGamesPlatform.DebugLogEnabled = false;
		// Activate the Google Play Games platform
		PlayGamesPlatform.Activate();
		// authenticate user: (sign in)
		Social.localUser.Authenticate((bool success) => {
			// handle success or failure
		});
	}

	public static void SubmitLeaderboard() {
		if (PlayerPrefs.GetString("Mode") == "Classic") {
			// Classic Easy
			if (PlayerPrefs.GetString ("Difficulty") == "Easy") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAI", (bool success) => {});
			}
			// Classic Normal
			if (PlayerPrefs.GetString ("Difficulty") == "Normal") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAJ", (bool success) => {});
			}
			// Classic Hard
			if (PlayerPrefs.GetString ("Difficulty") == "Hard") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAN", (bool success) => {});
			}
			// Classic Very Hard
			if (PlayerPrefs.GetString ("Difficulty") == "Very Hard") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAO", (bool success) => {});
			}
			// Classic Ironic
			if (PlayerPrefs.GetString ("Difficulty") == "Ironic") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAP", (bool success) => {});
			}
		}
		else if (PlayerPrefs.GetString ("Mode") == "Infinite") {
			// Infinite Easy
			if (PlayerPrefs.GetString ("Difficulty") == "Easy") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAQ", (bool success) => {});
			}
			// Infinite Normal
			if (PlayerPrefs.GetString ("Difficulty") == "Normal") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAR", (bool success) => {});
			}
			// Infinite Hard
			if (PlayerPrefs.GetString ("Difficulty") == "Hard") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAS", (bool success) => {});
			}
			// Infinite Very Hard
			if (PlayerPrefs.GetString ("Difficulty") == "Very Hard") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAT", (bool success) => {});
			}
			// Infinite Ironic
			if (PlayerPrefs.GetString ("Difficulty") == "Ironic") {
				Social.ReportScore(PlayerPrefs.GetInt ("highScore"), "CggIo5_16TsQAhAU", (bool success) => {});
			}

		}
	}

	public static void SubmitAchievements() {
		if (PlayerPrefs.GetInt ("Achievement0") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAA", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement1") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAB", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement2") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAC", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement3") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAD", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement4") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAE", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement5") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAF", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement6") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAG", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement7") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAH", 100.0f, (bool success) => {});
		}
		if (PlayerPrefs.GetInt ("Achievement8") == 1) {
			Social.ReportProgress("CggIo5_16TsQAhAM", 100.0f, (bool success) => {});
		}
		//Social.ShowAchievementsUI ();
	}

	public static void ShowLeaderboardsUI() {
		Social.ShowLeaderboardUI ();
	}

	public static void ShowAchievementsUI() {
		Social.ShowAchievementsUI ();
	}
}

