import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
	alias(libs.plugins.kotlinMultiplatform)
	alias(libs.plugins.kotlinCocoapods)
	alias(libs.plugins.androidKotlinMultiplatformLibrary)
	alias(libs.plugins.composeMultiplatform)
	alias(libs.plugins.composeCompiler)
	alias(libs.plugins.composeHotReload)
	alias(libs.plugins.sqldelight)
	alias(libs.plugins.sentryKmp)
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
		languageSettings.optIn("androidx.compose.material3.ExperimentalMaterial3Api")
		languageSettings.optIn("androidx.compose.foundation.layout.ExperimentalLayoutApi")
		languageSettings.optIn("androidx.compose.animation.ExperimentalSharedTransitionApi")
		languageSettings.optIn("kotlin.uuid.ExperimentalUuidApi")
	}

	androidLibrary {
		namespace = "xyz.tleskiv.tt.compose"
		compileSdk = libs.versions.android.compileSdk.get().toInt()
		minSdk = libs.versions.android.minSdk.get().toInt()

		// Enable Android resource processing for Compose resources
		androidResources {
			enable = true
		}
	}

	iosArm64()
	iosSimulatorArm64()

	cocoapods {
		summary = "Some description for the Shared Module"
		homepage = "https://github.com/example/TableTennisTracker"
		version = "1.0"
		ios.deploymentTarget = "15.0"
		podfile = project.file("../iosApp/Podfile")
		framework {
			baseName = "ComposeApp"
			isStatic = false
			freeCompilerArgs += listOf("-Xbinary=bundleId=xyz.tleskiv.tt.composeapp")
		}
	}

	jvm {
		testRuns["test"].executionTask.configure {
			useJUnitPlatform()
			testLogging {
				events("started", "passed", "failed", "skipped", "standardOut", "standardError")
				showStandardStreams = true
			}
		}
	}

	sourceSets {
		androidMain {
			dependencies {
				implementation(libs.compose.ui.tooling)
				implementation(libs.androidx.activity.compose)
				implementation(libs.sqldelight.driver.android)
			}
		}
		commonMain.dependencies {
			implementation(libs.compose.runtime)
			implementation(libs.compose.foundation)
			implementation(libs.compose.material3)
			implementation(libs.compose.material.icons.extended)
			implementation(libs.compose.ui)
			implementation(libs.compose.components.resources)
			implementation(libs.compose.ui.tooling.preview)

			implementation(libs.androidx.lifecycle.viewmodel)
			implementation(libs.androidx.lifecycle.viewmodel.nav3)
			implementation(libs.androidx.lifecycle.runtime)
			implementation(libs.kotlinx.serialization.json)
			implementation(libs.androidx.nav3.ui)
			implementation(libs.androidx.material3.adaptive)
			implementation(libs.androidx.material3.adaptive.nav3)

			// Koin DI
			implementation(project.dependencies.platform(libs.koin.bom))
			implementation(libs.koin.core)
			implementation(libs.koin.compose)
			implementation(libs.koin.compose.viewmodel)

			// SQLDelight
			implementation(libs.sqldelight.runtime)
			implementation(libs.sqldelight.coroutines)

			// Calendar
			implementation(libs.calendar.compose.multiplatform)

			// Charts
			implementation(libs.koalaplot.core)

			implementation(projects.shared)
		}
		commonTest.dependencies {
			implementation(libs.kotest.assertions.core)
			implementation(libs.kotest.framework.engine)
		}
		jvmTest.dependencies {
			implementation(libs.kotest.runner.junit5)
		}
		jvmMain.dependencies {
			implementation(compose.desktop.currentOs)
			implementation(libs.kotlinx.coroutinesSwing)
			implementation(libs.sqldelight.driver.jvm)
		}
		iosMain.dependencies {
			implementation(libs.sqldelight.driver.native)
		}
	}
}

compose.desktop {
	application {
		mainClass = "xyz.tleskiv.tt.MainKt"

		nativeDistributions {
			targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
			packageName = "xyz.tleskiv.tt"
			packageVersion = "1.0.0"
		}
	}
}

composeCompiler {
	stabilityConfigurationFiles.add(layout.projectDirectory.file("compose-stability.conf"))
	reportsDestination = layout.buildDirectory.dir("compose_compiler")
}

compose.resources {
	publicResClass = true
	generateResClass = always
}
