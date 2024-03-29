import { createWriteStream } from "fs";
import Dataframe from "./Dataframe";
import path from "../../utils/path";
import ServerException from "../../utils/errors/ServerException";

class Writer {
    
    private filename: string;
    private content: Dataframe;

    constructor (name: string, content: Dataframe) {
        this.filename = name;
        this.content = content;
    }

    saveContent (): void {
        const separator = ",";

        try {
            const writer = createWriteStream(`${path}${this.filename}`, { flags: 'w' });

            const columns = this.content.columns.join(separator);
            writer.write(columns+"\n");

            const rows = this.content.data;

            rows.map((row: any[]) => { writer.write(row.join(separator)+"\n")});

            writer.end();
        } catch (error: any) {
            throw new ServerException();
        }
    }
}

export default Writer;