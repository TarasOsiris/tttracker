import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
	alias(libs.plugins.kotlinMultiplatform)
	alias(libs.plugins.androidKotlinMultiplatformLibrary)
	alias(libs.plugins.composeMultiplatform)
	alias(libs.plugins.composeCompiler)
	alias(libs.plugins.composeHotReload)
}

// Task to copy compose resources with proper package prefix for Android
val copyComposeResourcesToAndroidResources by tasks.registering(Copy::class) {
	dependsOn("prepareComposeResourcesTaskForCommonMain")
	from("build/generated/compose/resourceGenerator/preparedResources/commonMain/composeResources")
	into("build/generatedComposeResources/composeResources/tabletennistracker.composeapp.generated.resources")
}

kotlin {
	androidLibrary {
		namespace = "xyz.tleskiv.tt.compose"
		compileSdk = libs.versions.android.compileSdk.get().toInt()
		minSdk = libs.versions.android.minSdk.get().toInt()

		compilerOptions {
			jvmTarget.set(JvmTarget.JVM_11)
		}
	}

	listOf(
		iosArm64(),
		iosSimulatorArm64()
	).forEach { iosTarget ->
		iosTarget.binaries.framework {
			baseName = "ComposeApp"
			isStatic = true
		}
	}

	jvm()

	sourceSets {
		androidMain {
			resources.srcDirs("build/generatedComposeResources")
			dependencies {
				implementation(compose.preview)
				implementation(libs.androidx.activity.compose)
			}
		}
		commonMain.dependencies {
			implementation(compose.runtime)
			implementation(compose.foundation)
			implementation(compose.material3)
			implementation(compose.ui)
			implementation(compose.components.resources)
			implementation(compose.components.uiToolingPreview)
			implementation(libs.androidx.lifecycle.viewmodelCompose)
			implementation(libs.androidx.lifecycle.runtimeCompose)
			implementation(projects.shared)
			implementation(projects.data)
		}
		commonTest.dependencies {
			implementation(libs.kotlin.test)
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

compose.resources {
	publicResClass = true
	generateResClass = always
}

// Ensure compose resources are copied before Android resource processing
tasks.matching { it.name == "processAndroidMainJavaRes" }.configureEach {
	dependsOn(copyComposeResourcesToAndroidResources)
}
