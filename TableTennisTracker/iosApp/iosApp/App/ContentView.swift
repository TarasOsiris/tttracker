import SwiftUI

struct ContentView: View {
    var body: some View {
        #if DEBUG
        if UIShell.useNative {
            RootTabView()
        } else {
            ComposeHostView().ignoresSafeArea()
        }
        #else
        ComposeHostView().ignoresSafeArea()
        #endif
    }
}
