import { readFile } from "fs/promises";
import path from "../../utils/path";
import Dataframe from "./Dataframe";

class Reader {

    private filename: string;

    constructor (name: string) {
        this.filename = name;
    }

    async getContent (): Promise<Dataframe> {
        const separator = ",";

        try {
            const data = await readFile(`${path}${this.filename}`, { encoding: "utf-8" });

            const rows = data.split(/\n/);
            const header = rows[0];

            const columns = header.split(separator);

            const dataframe = new Dataframe(columns);

            rows.shift();
            rows.map((row) => { row !== "" ? dataframe.addRow(row.split(separator)) : null });

            return dataframe;
        } catch (error: any) {
            return new Dataframe();
        }
    }
}

export default Reader;