import { NextFunction, Request, Response } from "express";
import ThesaurusService from "../services/thesaurus/ThesaurusService";
import ServerException from "../utils/errors/ServerException";

class ThesaurusController {

    constructor () {};

    async getThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        const thesaurus = thesaurusService.getEmptyThesaurus();

        return res.status(200).json({ thesaurus: thesaurus.generateJSONFromSynonyms() });
    }

    async fillThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { filename } = req.body as { filename: string };

            const thesaurus = await thesaurusService.fillThesaurusWithDataframe(filename);

            return res.status(200).json({ thesaurus: thesaurus.generateJSONFromSynonyms() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async addSynonym (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { word, synonym } = req.body as { word: string, synonym: string };

            await thesaurusService.addWordAndSynonym(word, synonym);

            return res.status(200).json({ message: "deu bom!" });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async removeSynonym (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { word, synonym } = req.body as { word: string, synonym: string };

            await thesaurusService.removeSynonym(word, synonym);

            return res.status(200).json({ message: "deu bom! foi excluido" });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }

    async removeWord (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const { word } = req.body as { word: string };

            await thesaurusService.removeWord(word);

            return res.status(200).json({ message: "deu bom! palavra excluida" });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar o thesasurus"));
        }
    }
}

export default ThesaurusController;