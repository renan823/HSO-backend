import ServerException from "../../utils/errors/ServerException";
import path from "../../utils/path";
import Dataframe from "../dataframe/Dataframe";
import { readFile, utils } from "xlsx";

class Reader {

    private filename: string;

    constructor (name: string) {
        this.filename = name;
    }

    async getContent (): Promise<Dataframe> {
        const dataframe = new Dataframe();

        try {
            const workbook = readFile(`${path}${this.filename}`, { cellDates: true });

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const data = utils.sheet_to_json(worksheet);

            dataframe.fromJSON(data);
        } catch (error: any) {
            throw new ServerException("Erro na leitura do arquivo", 500);
        }
        
        return dataframe;
    }
}

export default Reader;