import Levenshtein from "levenshtein";
import Network from "../network/Network";
import Dataframe from "../dataframe/Dataframe";

class Thesaurus {

    data: Network;
    weight: number;

    constructor () {
        this.data = new Network();
        this.weight = 2.5;
    }

    private addWord (word: string): void {
        this.data.addNode(word);
    }

    private addSynonym (words: string[]): void {
        this.data.addEdge(words.sort());
    }

    private isSynonym (words: string[]): boolean {
        if (words[0] !== words[1]) {
            const distance = new Levenshtein(words[0], words[1]).distance;

            return distance <= this.weight;
        }

        return false;
    }

    async fillWithDataframe (dataframe: Dataframe): Promise<void> {
        return new Promise((resolve) => {
            dataframe.data.map((row) => {
                row.map((term) => {
                    dataframe.data.map((line) => { 
                        line.map((item) => {
    
                            this.addWord(term);
                            this.addWord(item);
    
                            if (this.isSynonym([term, item])) {
                                this.addSynonym([term, item]);
                            }
                        })
                    })
                })
            })
            resolve();
        })
    }

    generateEntries (): string[][] {
        const entries = this.data.graph.mapEdges((_, __, source, target) => [source, target]);

        return entries;
    }

    generateJSON (): Object {
        const data = new Map<string, string[]>()
        
        this.data.graph.forEachNode((node) => {
            data.set(node, this.data.graph.neighbors(node));
        })

        const json: Object = Object.fromEntries(data);
        
        return json;
    }
}

export default Thesaurus;