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

	listOf(iosArm64(), iosSimulatorArm64()).forEach { iosTarget ->
		iosTarget.binaries.framework {
			baseName = "Shared"
			isStatic = false
			freeCompilerArgs += listOf("-Xbinary=bundleId=xyz.tleskiv.tt.shared")
			// Kotlin/Native only puts this module's own declarations in the ObjC header,
			// so the shared models have to be exported explicitly for Swift to see them.
			export(projects.shared)
			// SQLDelight's native driver needs the system sqlite3. Its cinterop klib declares
			// linkerOpts only for linux_x64/macos_x64, not for Apple device targets, so the
			// framework has to ask for it here.
			linkerOpts("-lsqlite3")
		}
	}

	applyDefaultHierarchyTemplate()
	sourceSets {
		// Sentry's Kotlin Multiplatform SDK must stay off iOS: linking it there would drag in
		// Sentry's Cocoa framework and stop the Kotlin framework from building on its own. iOS
		// gets a Swift-implemented CrashReporter instead.
		androidMain.dependencies {
			implementation(libs.sentry.kmp)
		}

		commonMain.dependencies {
			api(projects.shared)

			// public API surface of :core
			api(libs.kmp.lifecycle.viewmodel)
			api(libs.kotlinx.coroutines.core)
			api(libs.kotlinx.datetime)
			api(libs.sqldelight.runtime)
			api(libs.koin.core)

			api(project.dependencies.platform(libs.koin.bom))
			implementation(libs.koin.core.viewmodel)
			implementation(libs.sqldelight.coroutines)
		}
		commonTest.dependencies {
			implementation(libs.kotest.assertions.core)
			implementation(libs.kotest.framework.engine)
		}
		iosMain.dependencies {
			implementation(libs.sqldelight.driver.native)
		}
	}
}
