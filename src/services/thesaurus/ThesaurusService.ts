import DataframeService from "../dataframe/DataframeService";
import Thesaurus from "./Thesaurus";

class ThesaurusService {

    getEmptyThesaurus (): Thesaurus {
        return new Thesaurus();
    }

    async fillThesaurusWithDataframe (filename: string): Promise<Thesaurus> {
        const thesaurus = new Thesaurus();
        const dataframeService = new DataframeService();

        if (filename.trim().length !== 0) {
            const dataframe = await dataframeService.readFromFile(filename);
            await thesaurus.fillWithDataframe(dataframe);
        }

        return thesaurus;
    }
}

export default ThesaurusService;