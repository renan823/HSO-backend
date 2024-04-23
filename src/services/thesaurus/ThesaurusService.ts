import { PrismaClient } from "@prisma/client";
import DataframeService from "../dataframe/DataframeService";
import Thesaurus from "./Thesaurus";

class ThesaurusService {

    getEmptyThesaurus (): Thesaurus {
        return new Thesaurus();
    }

    private generateId (words: string[]): string {
        return words.sort().join("<->");
    }

    private splitId (id: string): string[] {
        return id.split("<->");
    }

    async fillThesaurusWithDataframe (filename: string): Promise<Thesaurus> {
        const thesaurus = new Thesaurus();
        const dataframeService = new DataframeService();

        if (filename.trim().length !== 0) {
            const dataframe = await dataframeService.readFromFile(filename);
            await thesaurus.fillWithDataframe(dataframe);
        }

        const entries = thesaurus.generateEntries();

        for (const entry of entries) {
            await this.addWordAndSynonyms(entry[0], [entry[1]]);
        }

        return thesaurus;
    }

    async addWordAndSynonyms (word: string, synonyms: string[]) {
        const prisma = new PrismaClient();

        /*
        let insertions: any[] = synonyms.map(synonym => {
            if (synonym.trim().lenght !== 0) {
                return { id: this.generateId([word, synonym]) };
            }
        })
        
        await prisma.createMany({ data: insertions });
        */

        if (word.trim().length !== 0 && synonyms.length !== 0) {
            for (const synonym of synonyms) {
                let data = { id: this.generateId([word, synonym]) };
                let exists = await prisma.synonym.findUnique({ where: { id: data.id } });

                if (!exists) {
                    await prisma.synonym.create({ data });
                }
            }
        }
    }

    async getFullThesaurus (): Promise<Thesaurus> {
        const prisma = new PrismaClient();

        const synonyms = await prisma.synonym.findMany();
        const thesaurus = new Thesaurus();

        return new Promise((resolve, reject) => {
            synonyms.forEach(synonym => thesaurus.addSynonym(this.splitId(synonym.id)));
            resolve(thesaurus);
        });
    }
}

export default ThesaurusService;