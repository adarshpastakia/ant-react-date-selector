module.exports = function override(config, env) {
  const lessRules = {
    test: /\.less$/,
    use: [
      {
        loader: "style-loader" // creates style nodes from JS strings
      },
      {
        loader: "css-loader" // translates CSS into CommonJS
      },
      {
        loader: "less-loader", // compiles Less to CSS
        options: {
          javascriptEnabled: true
        }
      }
    ]
  };

  const oneOfRule = config.module.rules.find(
    rule => rule.oneOf !== undefined
  );
  if (oneOfRule) {
    oneOfRule.oneOf.unshift(lessRules);
  } else {
    // Fallback to previous behaviour of adding to the end of the rules list.
    config.module.rules.push(lessRules);
  }
  return config;
};