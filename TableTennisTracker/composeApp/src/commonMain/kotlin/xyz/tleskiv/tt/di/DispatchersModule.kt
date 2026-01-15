package xyz.tleskiv.tt.di

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import org.koin.core.qualifier.named
import org.koin.dsl.module

object DispatcherQualifiers {
    const val IO = "dispatcher_io"
    const val DEFAULT = "dispatcher_default"
    const val MAIN = "dispatcher_main"
    const val UNCONFINED = "dispatcher_unconfined"
}

val dispatchersModule = module {
    single<CoroutineDispatcher>(named(DispatcherQualifiers.IO)) { Dispatchers.IO }
    single<CoroutineDispatcher>(named(DispatcherQualifiers.DEFAULT)) { Dispatchers.Default }
    single<CoroutineDispatcher>(named(DispatcherQualifiers.MAIN)) { Dispatchers.Main }
    single<CoroutineDispatcher>(named(DispatcherQualifiers.UNCONFINED)) { Dispatchers.Unconfined }
}
