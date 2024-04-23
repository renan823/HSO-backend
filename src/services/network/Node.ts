import Color from "../../utils/color";

class Node {

    private id: string;
    private weight: number;
    private label: String;

    constructor (weight: number, label: string) {
        this.id = `${Date.now() * (Math.random()+1)}`;
        this.weight = weight;
        this.label = label;
    }

    addWeight (amount: number): void {
        this.weight += amount;
    }

    getId (): string {
        return this.id;
    }

    getColor (): string {

        let r = (255 * this.weight) < 255 ? (255 * this.weight) : 255;
        let b = (255 * this.weight) < 255 ? (255 * this.weight) : 255;


        return new Color().rgbToHex(r, 0, b);
    }

    toObject (): object {
        return { id: this.id, label: this.label, weight: this.weight * 100, color: this.getColor() };
    }
}

export default Node;