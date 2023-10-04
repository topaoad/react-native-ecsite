module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: true,
        },
      ],
    ],
  };
};

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         root: ['./'],
//         alias: {
//           '@env': './.env',
//         },
//       },
//     ],
//   ],
// };
