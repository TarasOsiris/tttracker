package xyz.tleskiv.tt

import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.shouldBe

class ComposeAppCommonTest : FunSpec({
    test("adds numbers") { 
        println("Running common test")
        (1 + 2) shouldBe 3 
    }
})
