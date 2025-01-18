/*
const fs = require('fs');
const os = require('os');
const path = require('path');

const browserInstallLinks = {
    chrome: 'https://www.google.com/chrome/',
    firefox: 'https://www.mozilla.org/firefox/',
    edge: 'https://www.microsoft.com/edge',
    opera: 'https://www.opera.com/download'
};

const getBrowserPaths = () => {
    const platform = os.platform();
    const paths = {
        chrome: [],
        firefox: [],
        edge: [],
        opera: []
    };

    // Define possible paths for different browsers based on OS
    if (platform === 'win32') {
        paths.chrome.push(path.join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe'));
        paths.firefox.push(path.join(process.env.PROGRAMFILES, 'Mozilla Firefox', 'firefox.exe'));
        paths.edge.push(path.join(process.env.PROGRAMFILES, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
        paths.opera.push(path.join(process.env.PROGRAMFILES, 'Opera', 'launcher.exe'));
    } else if (platform === 'darwin') { // macOS
        paths.chrome.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
        paths.firefox.push('/Applications/Firefox.app/Contents/MacOS/firefox');
        paths.edge.push('/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge');
        paths.opera.push('/Applications/Opera.app/Contents/MacOS/Opera');
    } else { // Linux and other Unix-based OS
        paths.chrome.push('/usr/bin/google-chrome', '/usr/bin/chrome', '/usr/local/bin/google-chrome');
        paths.firefox.push('/usr/bin/firefox', '/usr/local/bin/firefox');
        paths.edge.push('/usr/bin/microsoft-edge', '/usr/local/bin/microsoft-edge');
        paths.opera.push('/usr/bin/opera', '/usr/local/bin/opera');
    }

    return paths;
};

const checkBrowserAvailability = () => {
    const paths = getBrowserPaths();
    const availableBrowsers = [];
    const missingBrowsers = [];

    // Check if each browser executable exists
    for (const [browser, pathsArray] of Object.entries(paths)) {
        const isAvailable = pathsArray.some(fs.existsSync);
        if (isAvailable) {
            availableBrowsers.push(browser);
        } else {
            missingBrowsers.push({ name: browser, link: browserInstallLinks[browser] });
        }
    }

    return { availableBrowsers, missingBrowsers };
};

module.exports = checkBrowserAvailability;
*/