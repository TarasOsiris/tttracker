import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
	alias(libs.plugins.kotlinMultiplatform)
	alias(libs.plugins.androidKotlinMultiplatformLibrary)
	alias(libs.plugins.composeMultiplatform)
	alias(libs.plugins.composeCompiler)
	alias(libs.plugins.composeHotReload)
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

	listOf(iosArm64(), iosSimulatorArm64()).forEach { iosTarget ->
		iosTarget.binaries.framework {
			baseName = "Shared"
			isStatic = false
			freeCompilerArgs += listOf("-Xbinary=bundleId=xyz.tleskiv.tt.shared")
			// Kotlin/Native only puts this module's own declarations in the ObjC header,
			// so the business layer has to be exported explicitly for Swift to see it.
			export(projects.core)
			export(projects.shared)
			// SQLDelight's native driver needs the system sqlite3. Its cinterop klib declares
			// linkerOpts only for linux_x64/macos_x64, not for Apple device targets, so the
			// framework has to ask for it here.
			linkerOpts("-lsqlite3")
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

			implementation(libs.androidx.lifecycle.viewmodel.compose)
			implementation(libs.androidx.lifecycle.viewmodel.nav3)
			implementation(libs.androidx.lifecycle.runtime)
			implementation(libs.kotlinx.serialization.json)
			implementation(libs.androidx.nav3.ui)

			// Koin DI
			implementation(project.dependencies.platform(libs.koin.bom))
			implementation(libs.koin.core)
			implementation(libs.koin.compose)
			implementation(libs.koin.compose.viewmodel)

			// Calendar
			implementation(libs.calendar.compose.multiplatform)

			// Charts
			implementation(libs.koalaplot.core)

			api(projects.core)
			api(projects.shared)
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
