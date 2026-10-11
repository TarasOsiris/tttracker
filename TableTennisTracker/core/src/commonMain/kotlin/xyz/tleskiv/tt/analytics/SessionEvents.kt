package xyz.tleskiv.tt.analytics

import xyz.tleskiv.tt.data.model.enums.SessionType

/**
 * Properties of `session_created` and `session_edited`. A session linked to a health workout leaves
 * out its duration and RPE: they may have been filled in from the workout (its length, the effort
 * rated on Apple Watch), and the privacy policy promises health data never reaches analytics.
 * Sends `name`, not `dbValue`, as every platform always has.
 */
fun sessionEventProperties(
	sessionType: SessionType,
	durationMinutes: Int,
	rpe: Int,
	matchCount: Int,
	isLinkedToHealth: Boolean
): Map<String, Any> = buildMap {
	put("session_type", sessionType.name)
	put("match_count", matchCount)
	put("health_linked", isLinkedToHealth)
	if (!isLinkedToHealth) {
		put("duration_minutes", durationMinutes)
		put("rpe", rpe)
	}
}
