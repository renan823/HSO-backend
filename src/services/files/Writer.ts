import path from "../../utils/path";
import ServerException from "../../utils/errors/ServerException";
import { utils, writeFile } from "xlsx";

class Writer {
    
    private filename: string;
    private content: any[];

    constructor (name: string, content: any[]) {
        this.filename = name;
        this.content = content;
    }

    saveContent (): void {
        try {
            const workbook = utils.book_new();
            const worksheet = utils.json_to_sheet(this.content);

            utils.book_append_sheet(workbook, worksheet, "default");

            writeFile(workbook, `${path}${this.filename}`);
        } catch (error: any) {
            throw new ServerException("Erro na gravação do arquivo", 500);
        }
    }
}

export default Writer;