import Dataframe from "./Dataframe";
import Filter from "./Filter";
import Reader from "../files/Reader";
import Writer from "../files/Writer";

class DataframeService {

    async readFromFile (file: string): Promise<Dataframe> {
        if (file.trim().length !== 0) {
            const reader = new Reader(file);

            const dataframe: Dataframe = await reader.getContent();

            return dataframe;
        }

        return new Dataframe();
    }

    async saveToFile (file: string, dataframe: Dataframe): Promise<void> {
        if (file.trim().length !== 0) {
            const content = dataframe.exportJSON();

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

    async applyFilter (file: string, filters: string[]) {
        if (file.trim().length !== 0) {
            const dataframe = await this.readFromFile(file);

            filters.map((filter) => dataframe.applyFilter(new Filter(filter).apply()));

            await this.saveToFile(file, dataframe);
        }
    }

    async replaceWords (file: string, words: string[], substitutes: string[]) {
        if (file.trim().length !== 0) {
            const dataframe = await this.readFromFile(file);

            words.map((word, index) => dataframe.applyReplace(word, substitutes[index]));

            await this.saveToFile(file, dataframe);
        }
    }
}

export default DataframeService;