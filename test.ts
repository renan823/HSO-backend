import Dataframe from "./src/services/dataframe/Dataframe";
import Thesaurus from "./src/services/thesaurus/Thesaurus";

let t = new Thesaurus();
let d = new Dataframe();

d.columns = ["word1", "word2", "word3"];

d.addRow(["tdic", "tidc", "tdics"]);
d.addRow(["carro", "tidc", "carros"]);
d.addRow(["paralelepipedo", "tdic", "carro"]);
d.addRow(["tidcs", "quarto", "arroz"]);

console.log(d.head());

t.fillWithDataframe(d)

t.setSynonyms("carro", ["carros"]);
t.setSynonyms("carros", ["carro"]);
t.setSynonyms("arroz", []);

console.log(t.show())
console.log(t.generateEntries())