import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
	alias(libs.plugins.kotlinMultiplatform)
	alias(libs.plugins.androidKotlinMultiplatformLibrary)
	alias(libs.plugins.sqldelight)
}

sqldelight {
	databases {
		create("AppDatabase") {
			packageName.set("xyz.tleskiv.tt.db")
			schemaOutputDirectory.set(file("src/commonMain/sqldelight/migrations"))
			verifyMigrations.set(true)
		}
	}
}

kotlin {
	sourceSets.all {
		languageSettings.optIn("kotlin.time.ExperimentalTime")
		languageSettings.optIn("kotlin.uuid.ExperimentalUuidApi")
	}

	androidLibrary {
		namespace = "xyz.tleskiv.tt.core"
		compileSdk = libs.versions.android.compileSdk.get().toInt()
		minSdk = libs.versions.android.minSdk.get().toInt()

		compilerOptions {
			jvmTarget.set(JvmTarget.JVM_11)
		}
	}

	iosArm64()
	iosSimulatorArm64()

	jvm {
		testRuns["test"].executionTask.configure { useJUnitPlatform() }
	}

	sourceSets {
		commonMain.dependencies {
			api(projects.shared)

			// public API surface of :core
			api(libs.androidx.lifecycle.viewmodel)
			api(libs.kotlinx.coroutines.core)
			api(libs.kotlinx.datetime)
			api(libs.sqldelight.runtime)
			api(libs.koin.core)

			implementation(project.dependencies.platform(libs.koin.bom))
			implementation(libs.koin.core.viewmodel)
			implementation(libs.sqldelight.coroutines)
		}
		commonTest.dependencies {
			implementation(libs.kotest.assertions.core)
			implementation(libs.kotest.framework.engine)
		}
		jvmTest.dependencies {
			implementation(libs.kotest.runner.junit5)
		}
		jvmMain.dependencies {
			implementation(libs.sqldelight.driver.jvm)
			implementation(libs.sentry.kmp)
		}
		iosMain.dependencies {
			implementation(libs.sqldelight.driver.native)
		}
	}
}
