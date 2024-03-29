import Dataframe from "./Dataframe";
import Reader from "./Reader";
import Writer from "./Writer";

class DataframeService {

    async readFromFile (file: string): Promise<Dataframe> {
        if (file.trim().length !== 0) {
            const reader = new Reader(file);

            const dataframe: Dataframe = await reader.getContent();

            return dataframe;
        }

        return new Dataframe();
    }

    async saveToFile (file: string, content: Dataframe): Promise<void> {
        if (file.trim().length !== 0) {
            const writer = new Writer(file, content);
            
            writer.saveContent();
        }
    }

    async dropColumn (file: string, column: string): Promise<void> {
        if (file.trim().length !== 0) {
            const dataframe = await this.readFromFile(file);

            dataframe.dropColumn(column);

            await this.saveToFile(file, dataframe);
        }
    }
}

export default DataframeService;