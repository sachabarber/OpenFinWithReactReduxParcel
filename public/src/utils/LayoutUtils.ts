import { PersistedWindowInfo } from './../common/commonModels';

export class LayoutService {
    private static instance: LayoutService;
    private static isLoading: boolean;

    private constructor() {

    }

    static getInstance() {
        if (!LayoutService.instance) {
            LayoutService.instance = new LayoutService();
        }
        return LayoutService.instance;
    }


    hydrateWindows = async (mainWindow) => {

        if (typeof (Storage) === "undefined") {
            console.log('browser doesnt support local storage');
            return;
        } 

        try {
            LayoutService.isLoading = true;
            var persistedPersistedWindowsJson = localStorage.getItem('persisted-app-state');
            if (persistedPersistedWindowsJson !== null) {
                var persistedPersistedWindows = [] as PersistedWindowInfo[];
                persistedPersistedWindows = JSON.parse(persistedPersistedWindowsJson);

                console.log('Hydrating using this from storage', persistedPersistedWindows);

                //deal with main window
                var mainWindowInfo = await mainWindow.getInfo();
                for (var i = 0; i < persistedPersistedWindows.length; i++) {
                    var persistedPersistedWindow = persistedPersistedWindows[i];
                    if (persistedPersistedWindow.isChildWindow === true) {
                        const theChildWindow = await this.showChildWindow(
                            persistedPersistedWindow.name,
                            persistedPersistedWindow.url,
                            persistedPersistedWindow.width,
                            persistedPersistedWindow.height,
                            persistedPersistedWindow.resizable);

                        await theChildWindow.setBounds({
                            height: persistedPersistedWindow.height,
                            width: persistedPersistedWindow.width,
                            top: persistedPersistedWindow.top,
                            left: persistedPersistedWindow.left
                        });
                    }
                }

            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            LayoutService.isLoading = false;
        }
    }


    showChildWindow = async (name: string, url: string, width: number, height: number, resizable: boolean) => {

        return await fin.Window.create({
            name: name,
            url: url,
            defaultWidth: width,
            defaultHeight: height,
            width: width,
            height: height,
            resizable: resizable,
            autoShow: true
        });
    }


    persistWindows = async (mainWindow) => {

        if (typeof (Storage) === "undefined") {
            console.log('browser doesnt support local storage');
            return;
        } 

        if (LayoutService.isLoading)
            return;

        var persistedPersistedWindows = [] as PersistedWindowInfo[];

        //obtain main window details
        var persistedWindowInfo = await this.extractInfoForWindow(mainWindow, false);
        persistedPersistedWindows.push(persistedWindowInfo);

        //obtain child window details
        const app = await fin.Application.getCurrent();
        var childWindows = await app.getChildWindows();

        for (var i = 0; i < childWindows.length; i++) {
            persistedWindowInfo = await this.extractInfoForWindow(childWindows[i], true);

            var windowUrlWithoutQueryString = persistedWindowInfo.name;
            if (persistedWindowInfo.name.indexOf("?") > 0) {
                windowUrlWithoutQueryString = persistedWindowInfo.name.substring(0, persistedWindowInfo.name.indexOf("?"));
            }
        
            console.log("windowUrlWithoutQueryString",windowUrlWithoutQueryString);
            persistedPersistedWindows = persistedPersistedWindows.filter(function (value, index, arr) {
                return !value.name.startsWith(windowUrlWithoutQueryString);
            });
            persistedPersistedWindows.push(persistedWindowInfo);
        }


        console.log(persistedPersistedWindows);
        console.log("has this many items",persistedPersistedWindows.length);

        localStorage.removeItem('persisted-app-state');
        localStorage.setItem('persisted-app-state', JSON.stringify(persistedPersistedWindows));

    
        var fromStorage = JSON.parse(localStorage.getItem('persisted-app-state'));
        console.log(fromStorage);
        console.log("from storage has this many items", fromStorage.length);

    }


    extractInfoForWindow = async (theWindow, isChild) => {
        var bounds = await theWindow.getBounds();
        var info = await theWindow.getInfo();
        var options = await theWindow.getOptions();
        return new PersistedWindowInfo(
            info.title,
            info.url,
            bounds.width,
            options.defaultWidth,
            options.defaultHeight,
            bounds.height,
            bounds.left,
            bounds.top,
            options.resizable,
            isChild);
    }
   
}


