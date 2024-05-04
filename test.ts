import DataframeService from "./src/services/dataframe/DataframeService";
import Thesaurus from "./src/services/thesaurus/Thesaurus";

const thesaurus = new Thesaurus;
const service = new DataframeService();


(async () => {
    const dataframe = await service.readFromFile("2024-04-10T22:42:49.xlsx");
    await thesaurus.fillWithDataframe(dataframe);

    console.log(thesaurus.generateJSON())
    console.log(thesaurus.generateEntries())
})()

