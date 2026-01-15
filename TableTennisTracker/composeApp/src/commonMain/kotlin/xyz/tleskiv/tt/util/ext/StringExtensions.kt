package xyz.tleskiv.tt.util.ext

fun String.capCase(): String = this.lowercase().replaceFirstChar { it.uppercase() }