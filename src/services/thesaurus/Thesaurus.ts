import Levenshtein from "levenshtein";
import Dataframe from "../dataframe/Dataframe";

class Thesaurus {

    private synonyms: Map<string, string[]>;
    private weight: number;

    constructor () {
        this.synonyms = new Map<string, string[]>;
        this.weight = 2;
    }

    private sortWords (words: string[]): string[] {
        return words.sort();
    }

    private addWord (word: string): void {
        if (!this.synonyms.has(word)) {
            this.synonyms.set(word, []);
        }
    }

    removeWord (word: string): void {
        this.synonyms.forEach((values) => {
            let location = values.indexOf(word);
            if (location >= 0) {
                values.splice(location, 1);
            }
        })

        this.synonyms.delete(word);
    }

    addSynonym (words: string[]): void {
        let [w1, w2] = this.sortWords(words);

        this.addWord(w1);
        this.addWord(w2);

        if (!this.synonyms.get(w1)?.includes(w2)) {
            this.synonyms.get(w1)?.push(w2);
        }

        if (!this.synonyms.get(w2)?.includes(w1)) {
            this.synonyms.get(w2)?.push(w1);
        }
    }

    removeSynonym (words: string[]): void {
        
    }

    isSynonym (words: string[]): boolean {
        let [w1, w2] = this.sortWords(words);

        if (w1 === w2) {
            return false;
        }

        let levenshtein = new Levenshtein(w1, w2);

        return levenshtein.distance <= this.weight;
    }

    setSynonyms (word: string, synonyms: string[]): void {
        this.synonyms.set(word, synonyms);
    }

    fillWithDataframe (dataframe: Dataframe): void {
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
    }

    generateEntries (): any[][] {
        let entries: any[][] = [];

        this.synonyms.forEach((values, key) => {
            values.map((value) => {
                let entry = this.sortWords([value, key]);

                if (!entries.some(e => e[0] === entry[0] && e[1] === entry[1])) {
                    entries.push(entry);
                }
            })
        })

        return entries;
    }

    show (): Map<string, string[]> {
        return this.synonyms;
    }
}

export default Thesaurus;