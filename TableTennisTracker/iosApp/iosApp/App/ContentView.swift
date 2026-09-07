import SwiftUI

struct ContentView: View {
    var body: some View {
        if UIShell.useNative {
            RootTabView()
        } else {
            ComposeHostView().ignoresSafeArea()
        }
    }
}
