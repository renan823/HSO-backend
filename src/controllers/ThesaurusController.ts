import { NextFunction, Request, Response } from "express";
import ThesaurusService from "../services/thesaurus/ThesaurusService";

class ThesaurusController {

    constructor () {};

    async getThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        const thesaurus = thesaurusService.getEmptyThesaurus();
        return res.status(200).json({ thesaurus: thesaurus.generateJSON() });
    }

    async fillThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        const { filename } = req.body as { filename: string };

        const thesaurus = await thesaurusService.fillThesaurusWithDataframe(filename);


        return res.status(200).json({ thesaurus: thesaurus.generateJSON() });
    }
}

export default ThesaurusController;