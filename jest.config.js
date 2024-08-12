// module.exports = {
// 	roots: ['<rootDir>/src'],
// 	transform: {
// 		'^.+\\.tsx?$': 'ts-jest',
// 		'^.+\\.jsx?$': 'babel-jest',
// 	},
// 	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
// 	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// 	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
// 	transformIgnorePatterns: ['/node_modules/'],
// 	moduleNameMapper: {
// 		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
// 	},
// };

module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transformIgnorePatterns: ['/node_modules/(?!axios)'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
};
