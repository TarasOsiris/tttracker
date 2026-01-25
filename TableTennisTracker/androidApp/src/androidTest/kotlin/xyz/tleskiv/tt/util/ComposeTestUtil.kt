package xyz.tleskiv.tt.util

import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.test.SemanticsNodeInteractionsProvider
import androidx.test.espresso.Espresso
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.ComposeTestRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performImeAction
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performSemanticsAction
import androidx.compose.ui.test.performTextInput
import kotlinx.coroutines.runBlocking
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.getString

fun str(res: StringResource): String = runBlocking { getString(res) }

fun str(res: StringResource, vararg args: Any): String = runBlocking { getString(res, *args) }

fun SemanticsNodeInteractionsProvider.assertTextDisplayed(text: String) {
	onNode(hasText(text)).assertIsDisplayed()
}

fun SemanticsNodeInteractionsProvider.assertTextDisplayed(res: StringResource, vararg args: Any) {
	assertTextDisplayed(str(res, *args))
}

fun SemanticsNodeInteractionsProvider.clickText(text: String) {
	onNodeWithText(text).performClick()
}

fun SemanticsNodeInteractionsProvider.clickText(res: StringResource) {
	clickText(str(res))
}

fun SemanticsNodeInteractionsProvider.scrollToAndClickText(text: String) {
	onNodeWithText(text).performScrollTo().performClick()
}

fun SemanticsNodeInteractionsProvider.scrollToAndClickText(res: StringResource) {
	scrollToAndClickText(str(res))
}

fun SemanticsNodeInteractionsProvider.clickFirstText(text: String) {
	onAllNodesWithText(text).onFirst().performClick()
}

fun SemanticsNodeInteractionsProvider.assertFirstTextDisplayed(text: String) {
	onAllNodesWithText(text).onFirst().assertIsDisplayed()
}

fun SemanticsNodeInteractionsProvider.clickContentDescription(res: StringResource) {
	onNodeWithContentDescription(str(res), useUnmergedTree = true).performClick()
}

fun SemanticsNodeInteractionsProvider.setSliderValue(tag: String, value: Float) {
	onNodeWithTag(tag).performSemanticsAction(SemanticsActions.SetProgress) { it(value) }
}

fun SemanticsNodeInteractionsProvider.inputText(tag: String, text: String) {
	onNodeWithTag(tag).performTextInput(text)
}

fun SemanticsNodeInteractionsProvider.inputTextAndDismissKeyboard(tag: String, text: String) {
	onNodeWithTag(tag).performTextInput(text)
	onNodeWithTag(tag).performImeAction()
}

fun SemanticsNodeInteractionsProvider.clickTag(tag: String) {
	onNodeWithTag(tag).performClick()
}

fun SemanticsNodeInteractionsProvider.scrollToAndClickTag(tag: String) {
	onNodeWithTag(tag).performScrollTo().performClick()
}

fun pressBack() {
	Espresso.pressBack()
}

fun closeSoftKeyboard() {
	Espresso.closeSoftKeyboard()
}

fun <R : ComposeTestRule> R.waitForText(text: String, timeoutMillis: Long = 5000) {
	waitForIdle()
	waitUntil(timeoutMillis) { onAllNodesWithText(text).fetchSemanticsNodes().isNotEmpty() }
}
