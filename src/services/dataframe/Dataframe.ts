class Dataframe {

    columns: string[];
    data: any[][];

    constructor (columns: string[] = [], data: any[][] = []) {
        this.columns = columns;
        this.data = data;
    }

    head (n: number = 5): Dataframe {
        const data = this.data.slice(0, n);

        return new Dataframe (this.columns, data);
    }

    tail (n: number = 5): Dataframe {
        const data = this.data.slice(-n);

        return new Dataframe (this.columns, data);
    }

    sample (n: number = 5): Dataframe {
        //not implemented yet

        return this.head(10);
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

    setColumns (columns: string[]): void {
        this.columns = columns;
    }

    addRow (row: any[], index: number = -1): void {
        this.data.splice(index, 0, row);
    }

    dropRow (index: number): void {
        if (index <= this.data.length -1) {
            this.data.splice(index, 1);
        }
    }

    setRows (rows: any[][]): void {
        this.data = rows;
    }

    replace (target: string[], value: string): void {
        this.data = this.data.map((row: any[]) => row.map((term) => target.includes(term) ? value : term ));
    }

    notNull (): void {
        this.data = this.data.map((row: any[]) => row.map((term) => {
            if (!term || term === "null") {
                return "";
            }

            return term;
        }))
    }

    applyRegExp (expression: string, subtitute: string = ""): void {
        this.data = this.data.map((row) => row.filter((item) => `${item}`.replace(expression, subtitute)));
    }

    applyFilter (filter: any): void {
        this.data = this.data.map(filter);
    }
}

export default Dataframe;