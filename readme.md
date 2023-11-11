###  build using electron-builder 
https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution/customizing_the_notarization_workflow#3087734

```cmd
    yarn build --config electron-builder.yaml
```
<details>
<summary>✓ built in 7ms</summary>

    ✓ built in 7ms
    • electron-builder  version=24.6.4 os=22.6.0
    • loaded configuration  file=/Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/electron-builder.yaml
    • writing effective config  file=release/builder-effective-config.yaml
    • packaging       platform=darwin arch=x64 electron=24.8.8 appOutDir=release/mac
    • default Electron icon is used  reason=application icon is not set
    • signing         file=release/mac/MyDashboard.app identityName=Developer ID Application: Agile Software Design GmbH (3JK72P98Z7) identity
</details>

```cmd

    notarytool store-credentials
```

<details>

<summary>Profile name:</summary>

    Profile name:
    dash1
    We recommend using App Store Connect API keys for authentication. If you'd like to authenticate with an Apple ID and app-specific password instead, leave this unspecified.
    
    Path to App Store Connect API private key:
    
    Switching prompts to app-specific password credentials.
    Developer Apple ID:
    b.banjac@asd.email
    App-specific password for b.banjac@asd.email:
    Developer Team ID:
    3JK72P98Z7
    Validating your credentials...
    Success. Credentials validated.
    Credentials saved to Keychain.
    To use them, specify `--keychain-profile "dash1"`

</details>

```cmd
xcrun altool --notarize-app -f release/MyDashboard-0.0.0.dmg   --primary-bundle-id eu.agilesoftwaredesign.mydashboard -u b.banjac@asd.email -p bqqu-vcht-kqxk-cbtk

```




<details>

<summary>No errors uploading</summary>





No errors getting notarization info.

          Date: 2023-11-03 02:21:48 +0000
          Hash: 32ac7d270a1bf81b41fb3d781758fc6a35e81947410bd8d1827e41e92f607eb6
    LogFileURL: https://osxapps-ssl.itunes.apple.com/itunes-assets/Enigma116/v4/98/f7/54/98f7546d-bd1d-3cbc-361d-d67e23b7f193/developer_log.json?accessKey=1699172819_2687901094779173225_DYjUqAyFHvzf%2BFqdT2zW%2Br%2BI34OXuL9DOLDX3mOmq8D9leHMJfC5FuqB5nvhcWQQ32gocvKEsD3dSEYXq56RYbtgJkd6WwdR8nmW6px86cysVmUmIRVO0vf40yPthhgUYp8Gn2k7QbD6J08k2Sbh8W3O1N94sli5vfgpYbNjLvI%3D
RequestUUID: 0c648d02-084a-4c1f-82bf-37aed78f7991
Status: success
Status Code: 0
Status Message: Package Approved




2023-11-03 02:21:45.922 *** Warning: altool has been deprecated for notarization and starting in late 2023 will no longer be supported by the Apple notary service. You should start using notarytool to notarize your software. (-1030)
No errors uploading 'MyDashboard-0.0.0.dmg'.
RequestUUID = 0c648d02-084a-4c1f-82bf-37aed78f7991

</details>


```cmd
xcrun altool --notarization-info 0c648d02-084a-4c1f-82bf-37aed78f7991 -u b.banjac@asd.email -p bqqu-vcht-kqxk-cbtk 
```

<details>

<summary>No errors getting notarization info</summary>


No errors getting notarization info.

          Date: 2023-11-03 02:21:48 +0000
          Hash: 32ac7d270a1bf81b41fb3d781758fc6a35e81947410bd8d1827e41e92f607eb6
    LogFileURL: https://osxapps-ssl.itunes.apple.com/itunes-assets/Enigma116/v4/98/f7/54/98f7546d-bd1d-3cbc-361d-d67e23b7f193/developer_log.json?accessKey=1699172819_2687901094779173225_DYjUqAyFHvzf%2BFqdT2zW%2Br%2BI34OXuL9DOLDX3mOmq8D9leHMJfC5FuqB5nvhcWQQ32gocvKEsD3dSEYXq56RYbtgJkd6WwdR8nmW6px86cysVmUmIRVO0vf40yPthhgUYp8Gn2k7QbD6J08k2Sbh8W3O1N94sli5vfgpYbNjLvI%3D
RequestUUID: 0c648d02-084a-4c1f-82bf-37aed78f7991
Status: success
Status Code: 0
Status Message: Package Approved

</details>



```cmd
xcrun stapler staple  release/MyDashboard-0.0.0.dmg
```
Local test
```cmd
npx electron-builder --dir --config electron-builder.yaml
```
<details>

<summary>staple and validate action </summary>
Processing: /Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/release/MyDashboard-0.0.0.dmg
Processing: /Users/zaidsaeed/Development/web/mydashboard-1/mydashboard/release/MyDashboard-0.0.0.dmg
The staple and validate action worked!

</details>


<details>
<summary>OLD docs</summary>
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




for defining use arch

--arch x64 , arm64
</details>