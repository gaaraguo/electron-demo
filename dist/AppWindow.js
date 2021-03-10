const  {BrowserWindow}  =  require("electron");

let win;
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
class AppWindow extends BrowserWindow {
    
    #path = '';

    constructor(path) {

        win = super(windowConfig);
        
        win.loadURL(`file://${__dirname}/index.html` + path);

        console.log(`file://${__dirname}/index.html` + path);

        this.#path = path;
        
        // win.webContents.openDevTools();

        win.on('close', () => {
            window.manager.removeWindow(win);
            win = null;
        });

        win.on('resize', () => {

        })
    };

    getWindowPath(){
        return this.#path;
    }
}(AppWindow)

class WindowManager {

    #windowsDic = {};

    constructor(){
        
        if (typeof WindowManager.instance === 'object'){
            return WindowManager.instance;
        }
        WindowManager.instance = this;
        return this;

    };

    addWindow(window) {
    
        // window instanceof
        if(window.constructor.name == "AppWindow"){
           if(!this.#windowsDic.hasOwnProperty(window.getWindowPath()))
           {
               console.log("添加窗口" + window.getWindowPath());
               this.#windowsDic[window.getWindowPath()] = window;
           }
        }
    }

    removeWindow(window) {
        
        if(window.constructor.name == "AppWindow"){
            if(this.#windowsDic.hasOwnProperty(window.getWindowPath()))
            {
                console.log("移除窗口" + window.getWindowPath());
                delete this.#windowsDic[window.getWindowPath()];
            }
         }

    }

    getWindow(path) {
        if (this.#windowsDic.hasOwnProperty(path)){
            return this.#windowsDic[path];
        }
        return null;
    }


}(WindowManager)
module.exports = {
    WindowManager,AppWindow,BrowserWindow
}
// module.exports.WindowManager = WindowManager;
