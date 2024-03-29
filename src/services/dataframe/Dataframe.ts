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

}

export default Dataframe;