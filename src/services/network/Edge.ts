import Color from "../../utils/color";

class Edge {

    private id: string;
    private from: string;
    private to: string;
    private weight: number;

    constructor (from: string, to: string, weight: number) {
        this.id = [from, to].sort().join("<->");
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    getId (): string {
        return this.id;
    }

    addWeight (amount: number): void {
        this.weight += amount;
    }

    getColor (): string {

        let r = (255 * this.weight) < 255 ? (255 * this.weight) : 255;
        let g = (255 * this.weight) < 255 ? (255 * this.weight) : 255;


        return new Color().rgbToHex(r, g, 0);
    }

    toObject (): object {
        return { id: this.id, source: this.from, target: this.to, weight: this.weight/100 };
    }
}

export default Edge;