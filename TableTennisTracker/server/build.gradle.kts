plugins {
    alias(libs.plugins.kotlinJvm)
    alias(libs.plugins.ktor)
	alias(libs.plugins.sqldelight)
    application
}

group = "xyz.tleskiv.tt"
version = "1.0.0"
application {
    mainClass.set("xyz.tleskiv.tt.ApplicationKt")
    
    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

sqldelight {
	databases {
		create("ServerDatabase") {
			packageName.set("xyz.tleskiv.tt.db")
			schemaOutputDirectory.set(file("src/main/sqldelight/migrations"))
			verifyMigrations.set(true)
		}
	}
}

dependencies {
    implementation(projects.shared)
    implementation(libs.logback)
    implementation(libs.ktor.serverCore)
    implementation(libs.ktor.serverNetty)
	implementation(libs.ktor.serverAuth)
	implementation(libs.ktor.serverAuthJwt)
	implementation(libs.ktor.serverContentNegotiation)
	implementation(libs.ktor.serializationKotlinxJson)

	// Koin DI
	implementation(platform(libs.koin.bom))
	implementation(libs.koin.core)
	implementation(libs.koin.ktor)

	// SQLDelight
	implementation(libs.sqldelight.runtime)
	implementation(libs.sqldelight.coroutines)
	implementation(libs.sqldelight.driver.jvm)

	testImplementation(libs.ktor.serverTestHost)
    testImplementation(libs.kotlin.testJunit)
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile>().configureEach {
	compilerOptions {
		optIn.add("kotlin.uuid.ExperimentalUuidApi")
	}
}
