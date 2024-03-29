
class Dataframe {

    columns: string[];
    data: any[][];

    constructor (data: any[][] = [], columns: string[] = []) {
        this.columns = columns;
        this.data = data;
    }

    head (n: number = 5): Dataframe {
        const data = this.data.slice(0, n);

        return new Dataframe (data, this.columns);
    }

    tail (n: number = 5): Dataframe {
        const data = this.data.slice(-n);

        return new Dataframe (data, this.columns);
    }

    sample (n: number = 5): Dataframe {
        const max = this.data.length;
        
        if (n <= max) {
            const indexes = Array.from(new Array(n), () => Math.round(Math.random() * max -1));

            indexes.map((value, index) => {
                let occurences = indexes.filter((i) => i == value).length;

                if (occurences != 1) {
                    while (true) {
                        let newValue = Math.round(Math.random() * max -1);
                        if (indexes.filter((i) => i == value).length === 1) {
                            indexes.splice(index, 1, newValue);
                            break;
                        }
                    }
                }
            })

            let samples: any[][] = [];

            indexes.map((i) => { samples.push(this.data[i]) });

            return new Dataframe(samples, this.columns);
        }

        return this.head();
    }

    addColumn (column: string, values: any[], index: number = -1): void {
        this.columns.splice(index, 0, column);

        values.map((value: any, i: number) => {
            if (!this.data[i]) {
                this.data[i] = [value];
            } else {
                this.data[i].splice(index, 0, value || "");
            }
        });
    }

    dropColumn (column: string): void {
        const index = this.columns.indexOf(column);

        if (index >= 0) {
            this.columns.splice(index, 1);
            this.data.map((row: any[]) => { row.splice(index, 1) });
        }
    }

    addRow (row: any[], index: number = -1): void {
        this.data.splice(index, 0, row);
    }

    dropRow (index: number): void {
        if (index <= this.data.length -1) {
            this.data.splice(index, 1);
        }
    }
}

let df = new Dataframe();

df.addColumn("names", ["petter", "anne", "bob", "zuck", "mark", "pepper", "ryan", "jonny"])
df.addColumn("age", [12, 13, 12, 15, 16, 14, 15, 17], 1);

console.log(df.head());
console.log(df.tail());
console.log(df.sample());