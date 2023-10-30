build using forge 
https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution/customizing_the_notarization_workflow#3087734

yarn electron-forge publish  



 Artifacts available at: /Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/out/make


  cd out/make/zip/darwin/arm64

  (base) zaidsaeed@zaids-Air arm64 % ls
the-dashboard-darwin-arm64-0.0.0.zip	the-dashboard.app


xcrun notarytool submit the-dashboard-darwin-arm64-0.0.0.zip

 xcrun notarytool submit the-dashboard-darwin-arm64-0.0.0.zip --keychain-profile "bqqu-vcht-kqxk-cbtk"
    >Error: No Keychain password item found for profile: bqqu-vcht-kqxk-cbtk
    >Run 'notarytool store-credentials' to create another credential profile.

xcrun notarytool store-credentials
    Profile name:
        zaid    




        Switching prompts to app-specific password credentials.
        Developer Apple ID:
        b.banjac@asd.email
        App-specific password for b.banjac@asd.email: 
        Developer Team ID:
        3JK72P98Z7
        Validating your credentials...
        Success. Credentials validated.
        Credentials saved to Keychain.



xcrun notarytool submit the-dashboard-darwin-arm64-0.0.0.zip --keychain-profile "zaid"           


xcrun notarytool log 4fd73670-e15a-4e92-bb7b-b58495745f5b  --keychain-profile "zaid" developer_log.json
    Successfully downloaded submission log
    id: 4fd73670-e15a-4e92-bb7b-b58495745f5b
    location: /Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/out/make/zip/darwin/arm64/developer_log.json

 xcrun stapler staple "the-dashboard.app" 

    Processing: /Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/out/make/zip/darwin/arm64/the-dashboard.app
    Processing: /Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/out/make/zip/darwin/arm64/the-dashboard.app
    The staple and validate action worked!