import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
	alias(libs.plugins.androidApplication)
	alias(libs.plugins.composeMultiplatform)
	alias(libs.plugins.composeCompiler)
}

kotlin {
	compilerOptions {
		jvmTarget.set(JvmTarget.JVM_11)
	}
}

android {
	namespace = "xyz.tleskiv.tt"
	compileSdk = libs.versions.android.compileSdk.get().toInt()

	defaultConfig {
		applicationId = "xyz.tleskiv.tt"
		minSdk = libs.versions.android.minSdk.get().toInt()
		targetSdk = libs.versions.android.targetSdk.get().toInt()
		versionCode = 1
		versionName = "1.0"
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
		getByName("release") {
			isMinifyEnabled = false
		}
	}

	compileOptions {
		sourceCompatibility = JavaVersion.VERSION_11
		targetCompatibility = JavaVersion.VERSION_11
	}
}

dependencies {
	implementation(projects.composeApp)
	implementation(libs.compose.components.resources)
	implementation(libs.compose.ui.tooling.preview)
	implementation(libs.androidx.activity.compose)

	// Koin DI
	implementation(platform(libs.koin.bom))
	implementation(libs.koin.core)
	implementation(libs.koin.android)

	debugImplementation(libs.compose.ui.tooling)
	debugImplementation(libs.androidx.compose.ui.test.manifest)

	androidTestImplementation(libs.androidx.testExt.junit)
	androidTestImplementation(libs.androidx.espresso.core)
	androidTestImplementation(libs.androidx.compose.ui.test.junit4)
	implementation(libs.sqldelight.driver.android)
}
