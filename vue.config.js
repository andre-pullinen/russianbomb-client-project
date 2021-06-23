module.exports = {
  transpileDependencies: ["vuetify", "vuex-persist"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: "rb://./",
      builderOptions: {
        mac: {
          category: "public.app-category.role-playing-games"
        },
        win: {
          icon: "./icon.png",
          target: {
            target: "nsis",
            arch: ["x64", "ia32"]
          }
        },
        protocols: {
          role: "Viewer",
          name: "rb-protocol",
          schemes: ["rb"]
        },
        extraFiles: [
          {
            from: "pepflashplayer.dll",
            to: "./resources/pepflashplayer.dll"
          },
          {
            from: "pepflashplayer32.dll",
            to: "./resources/pepflashplayer32.dll"
          },
          {
            from: "libpepflashplayer.so",
            to: "./resources/libpepflashplayer.so"
          },
          {
            from: "settings.sol",
            to: "./resources/settings.sol"
          }
        ]
      }
    }
  }
};
