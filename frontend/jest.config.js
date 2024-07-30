// Used to configure Jest
module.exports = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
        runScripts: 'dangerously',
        url: 'http://localhost/',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        pretendToBeVisual: true,
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx']
};
