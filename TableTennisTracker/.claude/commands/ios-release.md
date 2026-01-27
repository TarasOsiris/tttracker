Prepare an iOS release for App Store:

1. Read the current CURRENT_PROJECT_VERSION and MARKETING_VERSION from `iosApp/Configuration/Config.xcconfig`
2. Increment CURRENT_PROJECT_VERSION by 1
3. Ask the user what the new MARKETING_VERSION should be (suggest incrementing minor version)
4. Update both values in `iosApp/Configuration/Config.xcconfig` and commit the version changes
5. Print release notes since the last ios tag (use `git log ios-{last-version}..HEAD`)
6. Add git tag in format `ios-{version}` and push the commit and tag to origin
7. Remind the user to open Xcode and archive/upload to App Store Connect
