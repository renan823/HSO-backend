import Dataframe from "./src/services/dataframe/Dataframe";
import Reader from "./src/services/dataframe/Reader";
import Writer from "./src/services/dataframe/Writer";


let reader = new Reader("test.csv");
let df = new Dataframe();

(async () => {
    df = await reader.getContent();
    console.log(df.head());
    console.log(" ")

    df.replace(["brazil"], "italy");
    console.log(df.head());
})()



