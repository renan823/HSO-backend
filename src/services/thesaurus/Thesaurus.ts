class Thesaurus {

    private synonyms: object;

    constructor () {
        this.synonyms = {};
    }

    private sortWords (words: string[]): string[] {
        return words.sort();
    }

    addSynonym (words: string[]) {
        let synonyms = this.sortWords(words);

        words
    }
}