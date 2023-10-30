module.exports = {
  packagerConfig: {
    asar: true,
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
      appleId: 'b.banjac@asd.email',
      appleIdPassword: 'bqqu-vcht-kqxk-cbtk',
      teamId: '3JK72P98Z7'
    }
  },
  rebuildConfig: {},
  makers: [

    {
      name: '@electron-forge/maker-pkg',
      config: {
        keychain: 'my-secret-ci-keychain'
      }
    },

    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],

  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'zaid 13',
          name: 'dashboard-release'
        },
        prerelease: true
      }
    }
  ]
};
