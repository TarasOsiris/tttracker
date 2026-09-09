package xyz.tleskiv.tt.util

import android.content.Context
import android.content.res.Configuration
import android.os.LocaleList
import androidx.annotation.StringRes
import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.test.SemanticsNodeInteractionsProvider
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
import androidx.compose.ui.test.performTouchInput
import androidx.compose.ui.test.swipeUp
import androidx.test.espresso.Espresso
import androidx.test.espresso.action.ViewActions
import androidx.test.espresso.matcher.ViewMatchers
import androidx.test.platform.app.InstrumentationRegistry
import java.util.Locale

/// The app renders in the in-app language, which `AndroidLocaleApplier` mirrors into
/// `Locale.getDefault()`. The target context still carries the device configuration, so resolving
/// through it directly would compare device-language text against a differently localized UI on any
/// device whose language is not the one the app is set to.
private val localizedContext: Context
	get() {
		val context = InstrumentationRegistry.getInstrumentation().targetContext
		val configuration = Configuration(context.resources.configuration)
		configuration.setLocales(LocaleList(Locale.getDefault()))
		return context.createConfigurationContext(configuration)
	}

fun str(@StringRes res: Int): String = localizedContext.getString(res)

fun str(@StringRes res: Int, vararg args: Any): String = localizedContext.getString(res, *args)

fun SemanticsNodeInteractionsProvider.assertTextDisplayed(text: String) {
	onNode(hasText(text)).assertIsDisplayed()
}

fun SemanticsNodeInteractionsProvider.assertTextDisplayed(@StringRes res: Int, vararg args: Any) {
	assertTextDisplayed(str(res, *args))
}

fun SemanticsNodeInteractionsProvider.clickText(text: String) {
	onNodeWithText(text).performClick()
}

fun SemanticsNodeInteractionsProvider.clickText(@StringRes res: Int) {
	clickText(str(res))
}

fun SemanticsNodeInteractionsProvider.scrollToAndClickText(text: String) {
	onNodeWithText(text).performScrollTo().performClick()
}

fun SemanticsNodeInteractionsProvider.scrollToAndClickText(@StringRes res: Int) {
	scrollToAndClickText(str(res))
}

fun SemanticsNodeInteractionsProvider.scrollToText(text: String) {
	onNodeWithText(text).performScrollTo()
}

fun SemanticsNodeInteractionsProvider.scrollToText(@StringRes res: Int) {
	scrollToText(str(res))
}

fun SemanticsNodeInteractionsProvider.scrollToText(@StringRes res: Int, vararg args: Any) {
	scrollToText(str(res, *args))
}

fun SemanticsNodeInteractionsProvider.clickFirstText(text: String) {
	onAllNodesWithText(text).onFirst().performClick()
}

fun SemanticsNodeInteractionsProvider.assertFirstTextDisplayed(text: String) {
	onAllNodesWithText(text).onFirst().assertIsDisplayed()
}

fun SemanticsNodeInteractionsProvider.clickContentDescription(@StringRes res: Int) {
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
	onNodeWithTag(tag, useUnmergedTree = true).performClick()
}

fun SemanticsNodeInteractionsProvider.scrollToAndClickTag(tag: String) {
	onNodeWithTag(tag, useUnmergedTree = true).performScrollTo().performClick()
}

fun SemanticsNodeInteractionsProvider.scrollToTag(tag: String) {
	onNodeWithTag(tag).performScrollTo()
}

fun SemanticsNodeInteractionsProvider.swipeUpOnTag(tag: String) {
	onNodeWithTag(tag).performTouchInput { swipeUp() }
}

fun pressBack() {
	Espresso.pressBack()
}

fun closeSoftKeyboard() {
	Espresso.closeSoftKeyboard()
}

fun espressoClickContentDescription(description: String) {
	Espresso.onView(ViewMatchers.withContentDescription(description)).perform(ViewActions.click())
}

fun espressoClickContentDescription(@StringRes res: Int) {
	espressoClickContentDescription(str(res))
}

fun <R : ComposeTestRule> R.waitForText(text: String, timeoutMillis: Long = 5000) {
	waitForIdle()
	waitUntil(timeoutMillis) { onAllNodesWithText(text).fetchSemanticsNodes().isNotEmpty() }
}

fun <R : ComposeTestRule> R.idle() {
	waitForIdle()
}
