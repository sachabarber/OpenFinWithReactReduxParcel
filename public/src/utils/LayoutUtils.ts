//import { PersistedWindowInfo } from './../common/commonModels';
import * as Layouts from "openfin-layouts"


export class LayoutService {
    private static instance: LayoutService;
    private static isLoading: boolean;

    private constructor() {
        Layouts.workspaces.setRestoreHandler(this.appRestoreHandler);
        Layouts.workspaces.setGenerateHandler(() => {
            //return custom data 
            //return {"foo":"bar"};
            return {}
         });
        Layouts.workspaces.ready();
    }

    static getInstance() {
        if (!LayoutService.instance) {
            LayoutService.instance = new LayoutService();
        }
        return LayoutService.instance;
    }


    persistWindows = async () => {

        if(LayoutService.isLoading)
            return;

        const workspaceObject = await Layouts.workspaces.generate();
        
        localStorage.setItem('persisted-app-state', JSON.stringify(workspaceObject));
    }

    hydrateWindows = async () => {

        try {
            LayoutService.isLoading = true;
            var persistedData = localStorage.getItem('persisted-app-state');
            if (persistedData !== null) {
                console.log('found old state restoring using it')
                var workspaceObject = JSON.parse(persistedData);
                Layouts.workspaces.restore(workspaceObject).then(result => {
                    //promise resolves with result once the layout has been restored
                    //handleResult(result)
                    console.log("after layout result", result)
                });
            }
        }
        finally {
            LayoutService.isLoading = false;
        }
    }


    appRestoreHandler = async (workspaceApp) => {
        const ofApp = await fin.Application.getCurrent();
        const openWindows = await ofApp.getChildWindows();
        //iterate through the child windows of the workspaceApp data 
        for (var i = 0; i < workspaceApp.childWindows.length; i++) { 
            //check for existence of the window
            if (!openWindows.some(w => w.identity.name === workspaceApp.childWindows[i].name)) {
                 await this.showChildWindow(
                     workspaceApp.childWindows[i].name,
                     workspaceApp.childWindows[i].url,
                     workspaceApp.childWindows[i].bounds.width,
                     workspaceApp.childWindows[i].bounds.height);

                await this.positionWindow(workspaceApp.childWindows[i], workspaceApp.childWindows[i].bounds);

            } else {
                //only position if the window exists
                await this.positionWindow(workspaceApp.childWindows[i], workspaceApp.childWindows[i].bounds);
            }
        }
        return;
    }

    openChild = async (name: string, url: string) => {
        return await fin.Window.create({
            name: name,
            url: url,

        });
    }

    positionWindow = async (theWindow: any, bounds : any) => {
        return await theWindow.setBounds({
            height: bounds.height,
            width: bounds.width,
            top: bounds.top,
            left: bounds.left
        });
    }

    // positionWindow = async (win: any, replacingPlaceholder: boolean) => {
    //     try {
    //         const {isShowing, isTabbed} = win;
    
    //         const ofWin = await fin.Window.wrap(win);
    //         await ofWin.setBounds(win.bounds);
    
    //         if (isTabbed) {
    //             if (replacingPlaceholder) {
    //                 // Trigger the `shown` event listener set up in createTabPlaceholder
    //                 await ofWin.show();
    //             }
    
    //             // Early exit for tabbed windows, as remaining tab setup will occur in DesktopTabWindow
    //             return;
    //         }
    
    //         await ofWin.leaveGroup();
    
    //         if (!isShowing) {
    //             await ofWin.hide();
    //             return;
    //         }
    
    //         if (win.state === 'normal') {
    //             // Need to both restore and show because the restore function doesn't emit a `shown` or `show-requested` event
    //             await ofWin.restore();
    //             await ofWin.show();
    //         } else if (win.state === 'minimized') {
    //             await ofWin.minimize();
    //         } else if (win.state === 'maximized') {
    //             await ofWin.maximize();
    //         }
    
    //     } catch (e) {
    //         console.error('position window error', e);
    //     }
    // };


    // hydrateWindows = async (mainWindow) => {

    //     if (typeof (Storage) === "undefined") {
    //         console.log('browser doesnt support local storage');
    //         return;
    //     } 

    //     try {
    //         LayoutService.isLoading = true;
    //         var persistedPersistedWindowsJson = localStorage.getItem('persisted-app-state');
    //         if (persistedPersistedWindowsJson !== null) {
    //             var persistedPersistedWindows = [] as PersistedWindowInfo[];
    //             persistedPersistedWindows = JSON.parse(persistedPersistedWindowsJson);

    //             console.log('Hydrating using this from storage', persistedPersistedWindows);

    //             //deal with main window
    //             var mainWindowInfo = await mainWindow.getInfo();
    //             for (var i = 0; i < persistedPersistedWindows.length; i++) {
    //                 var persistedPersistedWindow = persistedPersistedWindows[i];
    //                 if (persistedPersistedWindow.isChildWindow === true) {
    //                     const theChildWindow = await this.showChildWindow(
    //                         persistedPersistedWindow.name,
    //                         persistedPersistedWindow.url,
    //                         persistedPersistedWindow.width,
    //                         persistedPersistedWindow.height,
    //                         persistedPersistedWindow.resizable);

    //                     await theChildWindow.setBounds({
    //                         height: persistedPersistedWindow.height,
    //                         width: persistedPersistedWindow.width,
    //                         top: persistedPersistedWindow.top,
    //                         left: persistedPersistedWindow.left
    //                     });
    //                 }
    //             }

    //         }
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    //     finally {
    //         LayoutService.isLoading = false;
    //     }
    // }


    showChildWindow = async (name: string, url: string, width: number, height: number) => {

        return await fin.Window.create({
            name: name,
            url: url,
            defaultWidth: width,
            defaultHeight: height,
            width: width,
            height: height,
            resizable: false,
            autoShow: true
        });
    }
}


