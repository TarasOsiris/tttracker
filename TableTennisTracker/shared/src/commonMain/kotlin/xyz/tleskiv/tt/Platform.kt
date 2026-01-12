package xyz.tleskiv.tt

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform