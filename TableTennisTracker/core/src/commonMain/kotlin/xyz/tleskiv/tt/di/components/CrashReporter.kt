package xyz.tleskiv.tt.di.components

interface CrashReporter {
	fun start(dsn: String, userId: String)

	/** Tags every later event, such as `rc_user_id`, which Smashy Control uses to link a RevenueCat customer to their crashes. */
	fun setTag(key: String, value: String)
}
