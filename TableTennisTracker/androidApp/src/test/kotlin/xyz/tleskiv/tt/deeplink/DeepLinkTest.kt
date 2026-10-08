package xyz.tleskiv.tt.deeplink

import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe

class DeepLinkTest : FunSpec({

	val sessionId = "6f1c2a3b-4d5e-4f60-8a7b-9c0d1e2f3a4b"

	test("parse_analytics_returnsAnalytics") {
		DeepLink.parse("tttracker://analytics") shouldBe DeepLink.Analytics
	}

	test("parse_pro_returnsPro") {
		DeepLink.parse("tttracker://pro") shouldBe DeepLink.Pro
	}

	test("parse_sessionsNew_returnsNewSession") {
		DeepLink.parse("tttracker://sessions/new") shouldBe DeepLink.NewSession
	}

	test("parse_sessionsWithoutPath_returnsSessions") {
		DeepLink.parse("tttracker://sessions") shouldBe DeepLink.Sessions
		DeepLink.parse("tttracker://sessions/") shouldBe DeepLink.Sessions
	}

	test("parse_sessionWithUuid_returnsSession") {
		DeepLink.parse("tttracker://sessions/$sessionId") shouldBe DeepLink.Session(sessionId)
	}

	test("parse_sessionWithMalformedId_fallsBackToSessions") {
		val malformedId = "not-a-session"
		DeepLink.parse("tttracker://sessions/$malformedId") shouldBe DeepLink.Sessions
	}

	test("parse_uppercaseSchemeAndHost_isAccepted") {
		DeepLink.parse("TTTRACKER://Analytics") shouldBe DeepLink.Analytics
	}

	test("parse_otherScheme_returnsNull") {
		DeepLink.parse("https://analytics").shouldBeNull()
	}

	test("parse_unknownHost_returnsNull") {
		DeepLink.parse("tttracker://settings").shouldBeNull()
	}

	test("parse_nullOrMalformed_returnsNull") {
		DeepLink.parse(null).shouldBeNull()
		DeepLink.parse("tttracker://ana lytics").shouldBeNull()
	}

	test("uri_roundTrips_throughParse") {
		val links = listOf(DeepLink.Analytics, DeepLink.Sessions, DeepLink.NewSession, DeepLink.Session(sessionId), DeepLink.Pro)
		links.forEach { DeepLink.parse(it.uri) shouldBe it }
	}

	test("uri_matchesTheLinksIosBuilds") {
		DeepLink.Analytics.uri shouldBe "tttracker://analytics"
		DeepLink.NewSession.uri shouldBe "tttracker://sessions/new"
		DeepLink.Session(sessionId).uri shouldBe "tttracker://sessions/$sessionId"
		DeepLink.Pro.uri shouldBe "tttracker://pro"
	}
})
