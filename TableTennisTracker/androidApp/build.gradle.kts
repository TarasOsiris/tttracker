import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import java.util.Properties

plugins {
	alias(libs.plugins.androidApplication)
	alias(libs.plugins.composeCompiler)
	alias(libs.plugins.sentryAndroid)
}

kotlin {
	compilerOptions {
		jvmTarget.set(JvmTarget.JVM_11)
		optIn.addAll(
			"kotlin.time.ExperimentalTime",
			"kotlin.uuid.ExperimentalUuidApi",
			"androidx.compose.material3.ExperimentalMaterial3Api",
			"androidx.compose.material3.ExperimentalMaterial3ExpressiveApi",
			"androidx.compose.foundation.layout.ExperimentalLayoutApi",
			"androidx.compose.animation.ExperimentalSharedTransitionApi",
		)
	}
}

val keystorePropertiesFile = rootProject.file("androidApp/keystore.properties")
val keystoreProperties = Properties().apply {
	if (keystorePropertiesFile.exists()) {
		load(keystorePropertiesFile.inputStream())
	}
}

android {
	namespace = "xyz.tleskiv.tt"
	compileSdk = libs.versions.android.compileSdk.get().toInt()

	signingConfigs {
		create("release") {
			val storeFilePath = keystoreProperties["storeFile"] as? String
			if (storeFilePath != null) {
				storeFile = file(storeFilePath)
				storePassword = keystoreProperties["storePassword"] as String
				keyAlias = keystoreProperties["keyAlias"] as String
				keyPassword = keystoreProperties["keyPassword"] as String
			}
		}
	}

	defaultConfig {
		applicationId = "xyz.tleskiv.tt"
		minSdk = libs.versions.android.minSdk.get().toInt()
		targetSdk = libs.versions.android.targetSdk.get().toInt()
		versionCode = 16
		versionName = "1.3.0"
		testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
		// Routes instrumentation output through the test-services provider, which writes to
		// /sdcard/googletest/test_outputfiles — the one place `adb pull` can read on API 30+ without
		// root, which this Play-image emulator does not offer.
		testInstrumentationRunnerArguments["useTestStorageService"] = "true"

		buildConfigField(
			"String",
			"SENTRY_DSN",
			"\"https://ce3694f2e50b4bb0196220b338bd5974@o1145835.ingest.us.sentry.io/4510742786867200\""
		)

		buildConfigField(
			"String",
			"POSTHOG_API_KEY",
			"\"${System.getenv("POSTHOG_API_KEY") ?: "phc_c48wFADznJ68OBUeAcQLdKAf5K0GUNxMjf4xXhoopde"}\""
		)

		buildConfigField(
			"String",
			"REVENUECAT_API_KEY",
			"\"goog_kkkmRpyXxLLFUrnkDUYiwMaxOHb\""
		)
	}

	buildFeatures {
		buildConfig = true
		compose = true
	}

	packaging {
		resources {
			excludes += "/META-INF/{AL2.0,LGPL2.1}"
		}
	}

	buildTypes {
		getByName("debug") {
			applicationIdSuffix = ".debug"
		}
		getByName("release") {
			isMinifyEnabled = true
			isShrinkResources = true
			proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
			signingConfig = signingConfigs.getByName("release")
		}
	}

	compileOptions {
		sourceCompatibility = JavaVersion.VERSION_11
		targetCompatibility = JavaVersion.VERSION_11
		// The calendar library speaks java.time, which the platform only ships from API 26.
		isCoreLibraryDesugaringEnabled = true
	}

	testOptions {
		unitTests.isReturnDefaultValues = true
	}
}

dependencies {
	coreLibraryDesugaring(libs.desugar.jdk.libs)

	implementation(projects.core)
	implementation(projects.shared)

	implementation(libs.compose.runtime)
	implementation(libs.compose.ui)
	implementation(libs.compose.foundation)
	implementation(libs.compose.material3)
	implementation(libs.compose.material.icons.extended)
	implementation(libs.compose.ui.tooling.preview)
	implementation(libs.androidx.activity.compose)
	implementation(libs.androidx.core.ktx)

	implementation(libs.androidx.lifecycle.viewmodel.compose)
	implementation(libs.androidx.lifecycle.runtime)
	implementation(libs.androidx.lifecycle.viewmodel.nav3)
	implementation(libs.androidx.nav3.ui)
	implementation(libs.kotlinx.serialization.json)

	// Koin DI
	implementation(platform(libs.koin.bom))
	implementation(libs.koin.core)
	implementation(libs.koin.android)
	implementation(libs.koin.compose)
	implementation(libs.koin.compose.viewmodel)

	// Calendar
	implementation(libs.calendar.compose)

	// Charts
	implementation(libs.koalaplot.core)

	// PostHog Analytics
	implementation(libs.posthog.android)

	// RevenueCat
	implementation(libs.revenuecat.purchases)

	implementation(libs.sqldelight.driver.android)

	debugImplementation(libs.compose.ui.tooling)
	debugImplementation(libs.androidx.compose.ui.test.manifest)

	testImplementation(libs.kotest.assertions.core)
	testImplementation(libs.kotest.runner.junit5)

	androidTestImplementation(libs.androidx.testExt.junit)
	androidTestImplementation(libs.androidx.espresso.core)
	androidTestImplementation(libs.androidx.compose.ui.test.junit4)
	androidTestImplementation(projects.core)
	androidTestImplementation(projects.shared)
	androidTestUtil(libs.androidx.test.services)
}

composeCompiler {
	stabilityConfigurationFiles.add(layout.projectDirectory.file("compose-stability.conf"))
	reportsDestination = layout.buildDirectory.dir("compose_compiler")
}

tasks.withType<Test>().configureEach {
	useJUnitPlatform()
}

sentry {
	org = "nineva-studios"
	projectName = "tt-tracker-android"
	authToken = System.getenv("SENTRY_AUTH_TOKEN_PERSONAL")
	autoUploadProguardMapping.set(true)
	uploadNativeSymbols.set(false)
	autoInstallation.enabled.set(false)
	includeDependenciesReport.set(false)
}
