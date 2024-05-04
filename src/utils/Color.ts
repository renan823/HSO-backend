class Color {
    static toHex (value: number): string {
        if (value > 255) {
            value = 255
        }

        if (value < 0) {
            value = 0
        }

        const hex = Math.floor(value).toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    }

    //Função pronta para conversão (o melhor que encontrei)
    static hsvToHex (hue: number, saturation: number, value: number): string {
        const chroma = value * saturation;
        const huePrime = hue / 60;
        const x = chroma * (1 - Math.abs((huePrime % 2) - 1));

        let r1: number = 0; 
        let g1: number = 0; 
        let b1: number = 0;

        if (huePrime >= 0 && huePrime <= 1) {
            [r1, g1, b1] = [chroma, x, 0];
        } else if (huePrime > 1 && huePrime <= 2) {
            [r1, g1, b1] = [x, chroma, 0];
        } else if (huePrime > 2 && huePrime <= 3) {
            [r1, g1, b1] = [0, chroma, x];
        } else if (huePrime > 3 && huePrime <= 4) {
            [r1, g1, b1] = [0, x, chroma];
        } else if (huePrime > 4 && huePrime <= 5) {
            [r1, g1, b1] = [x, 0, chroma];
        } else if (huePrime > 5 && huePrime <= 6) {
            [r1, g1, b1] = [chroma, 0, x];
        }

        const m = value - chroma;
        const [r, g, b] = [r1 + m, g1 + m, b1 + m];

        const rHex = Math.round(r * 255).toString(16).padStart(2, '0');
        const gHex = Math.round(g * 255).toString(16).padStart(2, '0');
        const bHex = Math.round(b * 255).toString(16).padStart(2, '0');

        return `#${rHex}${gHex}${bHex}`;
    }

    static rgbToHex (r: number, g: number, b: number): string {
        return ("#" + this.toHex(r) + this.toHex(g) + this.toHex(b));
    }
}

export default Color;