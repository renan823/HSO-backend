class Color {

    constructor () {}

    private toHex (value: Number): string {
        let hex = value.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    }
 
    rgbToHex (r: Number, g: Number, b: Number): string {
        return "#" + this.toHex(r) + this.toHex(g) + this.toHex(b);
    }
}

export default Color;