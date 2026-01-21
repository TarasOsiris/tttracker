package xyz.tleskiv.tt

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import kotlinx.coroutines.runBlocking
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import tabletennistracker.composeapp.generated.resources.Res
import tabletennistracker.composeapp.generated.resources.action_add_session
import tabletennistracker.composeapp.generated.resources.action_save
import tabletennistracker.composeapp.generated.resources.label_duration
import tabletennistracker.composeapp.generated.resources.label_session_type
import tabletennistracker.composeapp.generated.resources.session_type_technique
import tabletennistracker.composeapp.generated.resources.sessions_week_mode
import tabletennistracker.composeapp.generated.resources.title_create_session
import org.jetbrains.compose.resources.getString as getComposeString

@RunWith(AndroidJUnit4::class)
class SessionsScreenTest {
	@get:Rule
	val composeTestRule = createAndroidComposeRule<MainActivity>()

	private fun str(res: org.jetbrains.compose.resources.StringResource): String = runBlocking { getComposeString(res) }

	@Test
	fun launchesSessionsScreen() {
		composeTestRule.onNodeWithText(str(Res.string.sessions_week_mode)).assertIsDisplayed()
	}

	@Test
	fun addSessionAndVerifyDetails() {
		composeTestRule.onNodeWithContentDescription(str(Res.string.action_add_session)).performClick()
		composeTestRule.onNodeWithText(str(Res.string.title_create_session)).assertIsDisplayed()

		val techniqueText = str(Res.string.session_type_technique)
		composeTestRule.onNodeWithText(techniqueText).performClick()
		composeTestRule.onNodeWithText(str(Res.string.action_save)).performClick()

		composeTestRule.waitForIdle()
		composeTestRule.waitUntil(timeoutMillis = 5000) {
			composeTestRule.onAllNodesWithText(techniqueText).fetchSemanticsNodes().isNotEmpty()
		}
		composeTestRule.onAllNodesWithText(techniqueText).onFirst().performClick()

		composeTestRule.waitForIdle()
		composeTestRule.onNode(hasText(str(Res.string.label_session_type))).assertIsDisplayed()
		composeTestRule.onAllNodesWithText(techniqueText).onFirst().assertIsDisplayed()
		composeTestRule.onNode(hasText(str(Res.string.label_duration))).assertIsDisplayed()
	}
}
