package xyz.tleskiv.tt.util.ext

import xyz.tleskiv.tt.analytics.SummaryStats

val SummaryStats.winRate: Double?
	get() = (matchesWon + matchesLost).takeIf { it > 0 }?.let { matchesWon.toDouble() / it }
