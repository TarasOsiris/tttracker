# Kotlin Serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class kotlinx.serialization.json.** { *** Companion; }
-keepclasseswithmembers class kotlinx.serialization.json.** { kotlinx.serialization.KSerializer serializer(...); }
-keep,includedescriptorclasses class xyz.tleskiv.tt.**$$serializer { *; }
-keepclassmembers class xyz.tleskiv.tt.** { *** Companion; }
-keepclasseswithmembers class xyz.tleskiv.tt.** { kotlinx.serialization.KSerializer serializer(...); }

# Koin
-keepnames class * extends android.app.Application

# SQLDelight
-keep class app.cash.sqldelight.** { *; }

# Keep data classes used with SQLDelight
-keep class xyz.tleskiv.tt.db.** { *; }

# Compose
-dontwarn androidx.compose.**

# Sentry
-keep class io.sentry.** { *; }
-keepnames class io.sentry.** { *; }
