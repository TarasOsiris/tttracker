package xyz.tleskiv.tt.model

import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.shouldBe
import kotlin.test.Test

class AnalyticsWidgetTest {
	@Test
	fun parseAnalyticsWidgetOrder_withNothingStored_returnsDeclarationOrder() {
		val expected = AnalyticsWidget.entries

		parseAnalyticsWidgetOrder(null) shouldContainExactly expected
	}

	@Test
	fun parseAnalyticsWidgetOrder_withPartialOrder_appendsTheRestInDeclarationOrder() {
		val stored = "heatmap,summary"
		val expected = listOf(
			AnalyticsWidget.HEATMAP,
			AnalyticsWidget.SUMMARY,
			AnalyticsWidget.WIN_LOSS,
			AnalyticsWidget.WEEKLY,
			AnalyticsWidget.STREAK,
			AnalyticsWidget.TRAINING_LOAD,
			AnalyticsWidget.SESSION_TYPES,
			AnalyticsWidget.HEAD_TO_HEAD
		)

		parseAnalyticsWidgetOrder(stored) shouldContainExactly expected
	}

	@Test
	fun parseAnalyticsWidgetOrder_withUnknownAndRepeatedKeys_dropsThem() {
		val stored = "weekly,removed_widget,weekly,summary"
		val expectedFirst = listOf(AnalyticsWidget.WEEKLY, AnalyticsWidget.SUMMARY)

		val order = parseAnalyticsWidgetOrder(stored)

		order.take(expectedFirst.size) shouldContainExactly expectedFirst
		order.size shouldBe AnalyticsWidget.entries.size
	}

	@Test
	fun toAnalyticsWidgetOrder_roundTripsThroughParse() {
		val order = AnalyticsWidget.entries.reversed()

		parseAnalyticsWidgetOrder(order.toAnalyticsWidgetOrder()) shouldContainExactly order
	}
}
