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