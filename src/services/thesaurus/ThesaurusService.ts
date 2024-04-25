import { PrismaClient } from "@prisma/client";
import DataframeService from "../dataframe/DataframeService";
import Thesaurus from "./Thesaurus";
import ServerException from "../../utils/errors/ServerException";

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
        const prisma = new PrismaClient();

        try {
            if (filename.trim().length !== 0) {
                const dataframe = await dataframeService.readFromFile(filename);
                await thesaurus.fillWithDataframe(dataframe);
            }
    
            const entries = thesaurus.generateEntries();
    
            for (const entry of entries) {
                let data = { id: this.generateId([entry[0], entry[1]]) };
                let exists = await prisma.synonym.findUnique({ where: { id: data.id } });

                if (!exists) {
                    await prisma.synonym.create({ data });
                }
            }
    
            return thesaurus;
        } catch (error: any) {
            throw new ServerException("Erro ao gerar o thesasurus");
        }
    }

    async addWordAndSynonym (word: string, synonym: string): Promise<void> {
        const prisma = new PrismaClient();

        try {
            if (word.trim().length !== 0 && synonym.trim().length !== 0 && word !== synonym) {
               
                let data = { id: this.generateId([word, synonym]) };
                let exists = await prisma.synonym.findUnique({ where: { id: data.id } });
    
                if (!exists) {
                    await prisma.synonym.create({ data });
                }

                let connections = await prisma.synonym.findMany({
                    where: {
                        OR: [
                            { id: { contains: `${word}<` } },
                            { id: { contains: `>${word}` } },
                        ]
                    }
                })

                for (let connection of connections) {
                    let words = connection.id.split("<->")
                    let neighbor = words[0] !== word ? words[0] : words[1];

                    if (neighbor !== synonym) {
                        let data = { id: this.generateId([neighbor, synonym]) };
                        let exists = await prisma.synonym.findUnique({ where: { id: data.id } });
            
                        if (!exists) {
                            await prisma.synonym.create({ data });
                        }
                    }
                }
            }
        } catch (error: any) {
            throw new ServerException("Erro ao adicionar palavra");
        }
    }

    async removeSynonym (word: string, synonym: string): Promise<void> {
        const prisma = new PrismaClient();

        try {
            let id =  this.generateId([word, synonym]);

            let a = await prisma.synonym.findMany();

            console.log(a);

            await prisma.synonym.deleteMany({ 
                where: { id } 
            });
            
            a = await prisma.synonym.findMany();

            console.log(a);

        } catch (error: any) {
            throw new ServerException("Erro ao excluir palavra");
        }
    }

    async removeWord (word: string): Promise<void> {
        const prisma = new PrismaClient();

        try {
            await prisma.synonym.deleteMany({ 
                where: {
                    OR: [
                        { id: { contains: `${word}<` } },
                        { id: { contains: `>${word}` } },
                    ]
                }
            });
        } catch (error: any) {
            throw new ServerException("Erro ao excluir palavra");
        }
    }
 
    async getFullThesaurus (): Promise<Thesaurus> {
        const prisma = new PrismaClient();

        try {
            const synonyms = await prisma.synonym.findMany();
            const thesaurus = new Thesaurus();

            return new Promise((resolve, reject) => {
                synonyms.forEach(synonym => thesaurus.addSynonym(this.splitId(synonym.id)));
                resolve(thesaurus);
            });
        } catch (error: any) {
            throw new ServerException("Erro ao gerar o thesasurus");
        }
    }
}

export default ThesaurusService;