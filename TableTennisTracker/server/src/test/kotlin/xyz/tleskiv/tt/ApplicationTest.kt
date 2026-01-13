package xyz.tleskiv.tt

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class ApplicationTest {

    @Test
    fun testRoot() = testApplication {
	    environment {
		    config = MapApplicationConfig(
			    "ktor.deployment.host" to "0.0.0.0",
			    "ktor.deployment.port" to "8080",
			    "app.environment" to "LOCAL",
			    "app.database.path" to "build/test-db/server.db"
		    )
	    }
        application {
            module()
        }
        val response = client.get("/")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("Ktor: ${Greeting().greet()}", response.bodyAsText())
    }
}