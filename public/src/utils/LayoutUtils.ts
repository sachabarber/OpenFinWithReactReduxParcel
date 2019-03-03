import { PersistedWindowInfo } from './../common/commonModels';

export class LayoutService {
    private static instance: LayoutService;

    private constructor() {

    }

    static getInstance() {
        if (!LayoutService.instance) {
            LayoutService.instance = new LayoutService();
        }
        return LayoutService.instance;
    }


    persistWindows = async (mainWindow) => {

        var persistedPersistedWindows = [] as PersistedWindowInfo[];

        //obtain main window details
        var persistedWindowInfo = await this.extractInfoForWindow(mainWindow);
        persistedPersistedWindows.push(persistedWindowInfo);

        //obtain child window details
        const app = await fin.Application.getCurrent();
        var childWindows = await app.getChildWindows();
        //await childWindows.map(async (win, index) => {
        //    persistedWindowInfo = await this.extractInfoForWindow(win);
        //    persistedPersistedWindows.push(persistedWindowInfo);
        //});

        for (var i = 0; i < childWindows.length; i++) {
            persistedWindowInfo = await this.extractInfoForWindow(childWindows[i]);
            persistedPersistedWindows.push(persistedWindowInfo);
        }


        console.log(persistedPersistedWindows);
        console.log("has this many items",persistedPersistedWindows.length);

        sessionStorage.removeItem('persisted-app-state');
        sessionStorage.setItem('persisted-app-state', JSON.stringify(persistedPersistedWindows));

    
        var fromStorage = JSON.parse(sessionStorage.getItem('persisted-app-state'));
        console.log(fromStorage);
        console.log("from storage has this many items", fromStorage.length);

    }


    extractInfoForWindow = async (theWindow) => {
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
            options.resizable);
    }
   
}


