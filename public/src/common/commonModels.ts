export class TileInfo {
    tilePair: string;
    tilePrice: number;
    constructor(tilePair: string, tilePrice: number) {
        this.tilePair = tilePair;
        this.tilePrice = tilePrice;
    }
}


export class BlotterInfo {

    constructor(
        public pair: string,
        public price: number,
        public dateCreated: Date
    )
    {

    }
}