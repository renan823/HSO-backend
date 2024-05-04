import { NextFunction, Request, Response } from "express";
import ThesaurusService from "../services/thesaurus/ThesaurusService";
import ServerException from "../utils/errors/ServerException";

class ThesaurusController {

    constructor () {};

    async getThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        const thesaurus = await thesaurusService.getFullThesaurus();

        return res.status(200).json({ thesaurus: thesaurus.generateJSON() });
    }

    async fillThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { filename } = req.body as { filename: string };

            const thesaurus = await thesaurusService.fillThesaurusWithDataframe(filename);

            return res.status(200).json({ thesaurus: thesaurus.generateJSON() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async addSynonym (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { word, synonym } = req.body as { word: string, synonym: string };

            await thesaurusService.addWordAndSynonym(word, synonym);

            const thesaurus = await thesaurusService.getFullThesaurus();

            return res.status(200).json({ message: "Conexão adicionada", thesaurus: thesaurus.generateJSON() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async removeSynonym (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { word, synonym } = req.body as { word: string, synonym: string };

            await thesaurusService.removeSynonym(word, synonym);

            const thesaurus = await thesaurusService.getFullThesaurus();

            return res.status(200).json({ message: "Conexão removida", thesaurus: thesaurus.generateJSON() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async removeWord (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { word } = req.body as { word: string };

            await thesaurusService.removeWord(word);

            const thesasurus = await thesaurusService.getFullThesaurus();

            return res.status(200).json({ message: "Palavra removida", thesasurus: thesasurus.generateJSON() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async clearThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesasurusService = new ThesaurusService();

        try {
            const thesaurus = await thesasurusService.destroyThesaurus();

            return res.status(200).json({ message: "Thesaurus limpo", thesaurus: thesaurus.generateJSON() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }
}

export default ThesaurusController;