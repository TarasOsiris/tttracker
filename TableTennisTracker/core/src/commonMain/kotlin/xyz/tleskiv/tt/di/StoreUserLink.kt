package xyz.tleskiv.tt.di

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import org.koin.mp.KoinPlatform
import xyz.tleskiv.tt.di.components.AnalyticsService
import xyz.tleskiv.tt.di.components.CrashReporter
import xyz.tleskiv.tt.repo.MetadataRepository

private const val LINKED_STORE_USER = "linked_rc_user_id"
private val linkScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

/**
 * Records the RevenueCat app user ID where the Smashy Control admin panel looks for it: the `rc_user_id` Sentry
 * tag and PostHog person property, so a customer in RevenueCat links to their app activity and crashes. The
 * person's PostHog and Sentry identity (the install's own ID) stays as it is.
 *
 * Call once RevenueCat is configured. The Sentry tag lives in memory, so it is set on every launch; the PostHog
 * `$set` is a billed event, so it goes out once per install, or again if RevenueCat hands back a different ID.
 */
fun linkStoreUser(storeUserId: String?) {
	if (storeUserId.isNullOrBlank()) return
	val koin = KoinPlatform.getKoinOrNull() ?: return
	koin.get<CrashReporter>().setTag("rc_user_id", storeUserId)
	val analytics = koin.get<AnalyticsService>()
	val metadata = koin.get<MetadataRepository>()
	linkScope.launch {
		if (metadata.getValue(LINKED_STORE_USER) == storeUserId) return@launch
		analytics.setPersonProperties(mapOf("rc_user_id" to storeUserId))
		metadata.setValue(LINKED_STORE_USER, storeUserId)
	}
}
