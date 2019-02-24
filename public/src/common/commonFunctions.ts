export function formatTo2Places(theNum: number) {
    var result: number = Math.round(theNum * 100) / 100
    return parseFloat(result.toString(10)).toFixed(2);
}