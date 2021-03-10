const fs = require('fs')
const { remote ,BrowserWindow} = require("electron");
const {
    contextBridge,
    ipcRenderer
} = require("electron");

const {WindowManager} = require("./WindowManager.js");



contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                console.log(123);
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                console.log(456);
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        
        closeWindow:(path) => {

            ipcRenderer.send('closeWindow',path);
            
        },

        createWindow:(path) =>{

            ipcRenderer.send('createWindow',path);
            
        }
    }
);