export default {
  preset: "ts-jest",
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
