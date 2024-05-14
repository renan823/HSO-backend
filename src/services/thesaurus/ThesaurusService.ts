import { PrismaClient } from "@prisma/client";
import DataframeService from "../dataframe/DataframeService";
import Thesaurus from "./Thesaurus";
import ServerException from "../../utils/errors/ServerException";

class ThesaurusService {

    private readonly prisma: PrismaClient;

    constructor () {
        this.prisma = new PrismaClient();
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
        
        try {
            if (filename.trim().length !== 0) {
                const dataframe = await dataframeService.readFromFile(filename);
                await thesaurus.fillWithDataframe(dataframe);
            }
    
            const entries = thesaurus.generateEntries();
    
            for (const entry of entries) {
                let data = { id: this.generateId([entry[0], entry[1]]) };
                let exists = await this.prisma.synonym.findUnique({ where: { id: data.id } });

                if (!exists) {
                    await this.prisma.synonym.create({ data });
                }
            }
    
            return thesaurus;
        } catch (error: any) {
            throw new ServerException("Erro ao gerar o thesasurus");
        }
    }

    async addWordAndSynonym (word: string, synonym: string): Promise<void> {
        try {
            if (word.trim().length !== 0 && synonym.trim().length !== 0 && word !== synonym) {
               
                let data = { id: this.generateId([word, synonym]) };
                let exists = await this.prisma.synonym.findUnique({ where: { id: data.id } });
    
                if (!exists) {
                    await this.prisma.synonym.create({ data });
                }

                let connections = await this.prisma.synonym.findMany({
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
                        let exists = await this.prisma.synonym.findUnique({ where: { id: data.id } });
            
                        if (!exists) {
                            await this.prisma.synonym.create({ data });
                        }
                    }
                }
            }
        } catch (error: any) {
            throw new ServerException("Erro ao adicionar palavra");
        }
    }

    async removeSynonym (word: string, synonym: string): Promise<void> {
        try {
            const id =  this.generateId([word, synonym]);

            await this.prisma.synonym.deleteMany({ 
                where: { id } 
            });
        } catch (error: any) {
            throw new ServerException("Erro ao excluir palavra");
        }
    }

    async removeWord (word: string): Promise<void> {
        try {
            await this.prisma.synonym.deleteMany({ 
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
        try {
            const synonyms = await this.prisma.synonym.findMany();
            const thesaurus = new Thesaurus();

            if (synonyms) {
                return new Promise((resolve) => {
                    synonyms.forEach(synonym => thesaurus.addSynonym(this.splitId(synonym.id)));
                    resolve(thesaurus);
                });
            }

            return thesaurus;
        } catch (error: any) {
            throw new ServerException("Erro ao gerar o thesasurus");
        }
    }

    async destroyThesaurus (): Promise<Thesaurus> {
        try {
            await this.prisma.synonym.deleteMany();

            return new Thesaurus();
        } catch (error: any) {
            throw new ServerException("Erro ao gerar o thesasurus");
        }
    }
}

export default ThesaurusService;