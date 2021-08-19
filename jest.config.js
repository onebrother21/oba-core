module.exports = {
	globals: {'ts-jest': {tsconfig: 'tsconfig.json'}},
	moduleFileExtensions: ['ts','js'],
  testPathIgnorePatterns:["<rootDir>/test/controllers"],
	transform: {'^.+\\.(ts|tsx)$': './node_modules/ts-jest'},
	testMatch: ['**/oba-core-api/test/all.test.(ts|js)'],
	testEnvironment: 'node'
};