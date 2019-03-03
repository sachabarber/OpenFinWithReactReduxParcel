export class TileInfo {
    constructor(
        public tilePair: string,
        public tilePrice: number)
    {

    }
}


export class BlotterInfo {

    constructor(
        public internalId: string,
        public pair: string,
        public price: number,
        public dateCreated: Date)
    {

    }
}


export class PersistedWindowInfo {

    constructor(
        public name: string,
        public url: string,
        public width: number,
        public height: number,
        public defaultWidth: number,
        public defaultHeight: number,
        public left:number,
        public top: number,
        public resizable: boolean,
        public isChildWindow: boolean) {

    }
}


