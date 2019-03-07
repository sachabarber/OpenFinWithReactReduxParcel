import * as Layouts from "openfin-layouts"
import { interval } from 'rxjs';


export class LayoutService {
    private static instance: LayoutService;

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


        const workspaceObject = await Layouts.workspaces.generate();
        
        localStorage.setItem('persisted-app-state', JSON.stringify(workspaceObject));
    }

    hydrateWindows = async () => {
        var persistedData = localStorage.getItem('persisted-app-state');
        if (persistedData !== null) {
            console.log('found old state restoring using it')
            var workspaceObject = JSON.parse(persistedData);
            await Layouts.workspaces.restore(workspaceObject);
        }

        interval(5000).subscribe(async x => {
            await LayoutService.getInstance().persistWindows();
        });
    }


    appRestoreHandler = async (workspaceApp) => {

        const sleep = m => new Promise(r => setTimeout(r, m))

        console.log('workspaceApp.childWindows', workspaceApp.childWindows)

        //iterate through the child windows of the workspaceApp data 
        for (var i = 0; i < workspaceApp.childWindows.length; i++) { 
            console.log('appRestoreHandler [' + i + "]", workspaceApp.childWindows[i])
            await this.openChild(workspaceApp.childWindows[i].name, workspaceApp.childWindows[i].url, workspaceApp.childWindows[i].bounds);
        }
        return layoutApp;
    }

    

    openChild = async (name: string, url: string, bounds : any) => {

        console.log("opening window", name, url)
        const win =  await fin.Window.create({
            name: name,
            url: url,
            defaultWidth: 100,
            defaultHeight: 100,
            width: 100,
            height: 100,
            resizable: false,
            autoShow: true
        });
        console.log('created win', win);
        await this.positionWindow(win, bounds);
    }

    positionWindow = async (theWindow: any, bounds: any) => {

        console.log("positionWindow", theWindow.name, bounds)

        await theWindow.setBounds({
            height: bounds.height,
            width: bounds.width,
            top: bounds.top,
            left: bounds.left
        });
    }

    showChildWindow = async (name: string, url: string, width: number, height: number) => {

        await fin.Window.create({
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


