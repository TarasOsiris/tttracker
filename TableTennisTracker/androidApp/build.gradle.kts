import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import java.util.Properties

plugins {
	alias(libs.plugins.androidApplication)
	alias(libs.plugins.composeMultiplatform)
	alias(libs.plugins.composeCompiler)
	alias(libs.plugins.sentryAndroid)
}

kotlin {
	compilerOptions {
		jvmTarget.set(JvmTarget.JVM_11)
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
		versionCode = 6
		versionName = "1.2.3"
		testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

		buildConfigField(
			"String",
			"SENTRY_DSN",
			"\"https://ce3694f2e50b4bb0196220b338bd5974@o1145835.ingest.us.sentry.io/4510742786867200\""
		)
	}

	buildFeatures {
		buildConfig = true
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
	}
}

dependencies {
	implementation(projects.composeApp)
	implementation(projects.shared)
	implementation(libs.compose.components.resources)
	implementation(libs.compose.ui.tooling.preview)
	implementation(libs.compose.foundation)
	implementation(libs.compose.material3)
	implementation(libs.androidx.activity.compose)
	implementation(libs.calendar.compose.multiplatform)

	// Koin DI
	implementation(platform(libs.koin.bom))
	implementation(libs.koin.core)
	implementation(libs.koin.android)

	debugImplementation(libs.compose.ui.tooling)
	debugImplementation(libs.androidx.compose.ui.test.manifest)

	androidTestImplementation(libs.androidx.testExt.junit)
	androidTestImplementation(libs.androidx.espresso.core)
	androidTestImplementation(libs.androidx.compose.ui.test.junit4)
	androidTestImplementation(libs.compose.components.resources)
	androidTestImplementation(projects.shared)
	androidTestImplementation(libs.calendar.compose.multiplatform)
	implementation(libs.sqldelight.driver.android)
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
