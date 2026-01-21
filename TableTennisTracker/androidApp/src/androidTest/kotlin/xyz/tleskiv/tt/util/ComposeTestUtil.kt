package xyz.tleskiv.tt.util

import kotlinx.coroutines.runBlocking
import org.jetbrains.compose.resources.StringResource
import org.jetbrains.compose.resources.getString

fun str(res: StringResource): String = runBlocking { getString(res) }

fun str(res: StringResource, vararg args: Any): String = runBlocking { getString(res, *args) }
