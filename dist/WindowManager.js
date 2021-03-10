
const { BrowserWindow } = require("electron");

class WindowManager {

    #windowsDic = {};

    constructor() {

        if (typeof WindowManager.instance === 'object') {
            return WindowManager.instance;
        }
        WindowManager.instance = this;
        return this;

    };


    createWindow(path) {
        if (!this.#windowsDic.hasOwnProperty(path)) {
            console.log("创建窗口" + path);
            this.#windowsDic[path] = new AppWindow().initWindow(path);
            console.log(this.#windowsDic);
        }
    }

    closeWindow(path) {
        if (this.#windowsDic.hasOwnProperty(path)) {
            let window = this.#windowsDic[path];
            console.log("移除窗口" + path);
            delete this.#windowsDic[path];
            window.close();
        }
    }

    getWindow(path) {
        if (this.#windowsDic.hasOwnProperty(path)) {
            return this.#windowsDic[path];
        }
        return null;
    }



} (WindowManager)


let windowConfig = {
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    maxWidth: 800,
    maxHeight: 600,
    center: true,
    resizable: true,
    show: true,
    titleBarStyle: 'hidden',
    backgroundColor: '#ffffff',
    webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: true, // 是否集成 Nodejs
        webSecurity: false,
        nodeIntegrationInWorker: true,
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: true, // turn off remote
        preload: __dirname + '/preload.js',
        nativeWindowOpen: true,
    }
};

class AppWindow {

    #path = '';

    #win;

    constructor() {

    };

    initWindow = function (path) {

        console.log("正在创建窗口" + path);

        this.#win = new BrowserWindow(windowConfig);

        this.#win.loadURL(`file://${__dirname}/index.html` + path);

        console.log(`file://${__dirname}/index.html` + path);

        this.#path = path;

        // win.webContents.openDevTools();

        this.#win.on('close', () => {
            new WindowManager().closeWindow(this.#path);
        });

        this.#win.on('resize', () => {

        })

        return this.#win;
    }

} (AppWindow)

module.exports = {
    WindowManager, AppWindow
}
// module.exports = BrowserWindow;
