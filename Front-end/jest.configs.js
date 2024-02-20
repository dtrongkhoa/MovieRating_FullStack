module.exports = {
  setupFiles: ["./jest.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)", "\\.css$"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
