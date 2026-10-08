package xyz.tleskiv.tt.model

enum class AnalyticsWidget(val key: String, val isInsight: Boolean = false) {
	SUMMARY("summary"),
	WIN_LOSS("win_loss"),
	WEEKLY("weekly"),
	HEATMAP("heatmap"),
	STREAK("streak", isInsight = true),
	TRAINING_LOAD("training_load", isInsight = true),
	SESSION_TYPES("session_types", isInsight = true),
	HEAD_TO_HEAD("head_to_head", isInsight = true)
}

data class AnalyticsWidgetSetting(val widget: AnalyticsWidget, val visible: Boolean)

fun defaultAnalyticsWidgets(): List<AnalyticsWidgetSetting> =
	AnalyticsWidget.entries.map { AnalyticsWidgetSetting(it, visible = true) }

fun parseAnalyticsWidgetOrder(stored: String?): List<AnalyticsWidget> {
	val byKey = AnalyticsWidget.entries.associateBy { it.key }
	val known = stored.orEmpty().split(",").mapNotNull { byKey[it.trim()] }.distinct()
	return known + AnalyticsWidget.entries.filterNot { it in known }
}

fun List<AnalyticsWidget>.toAnalyticsWidgetOrder(): String = joinToString(",") { it.key }

fun List<AnalyticsWidgetSetting>.moving(widget: AnalyticsWidget, offset: Int): List<AnalyticsWidgetSetting> {
	val from = indexOfFirst { it.widget == widget }
	if (from < 0) return this
	val to = (from + offset).coerceIn(indices)
	return toMutableList().apply { add(to, removeAt(from)) }
}
