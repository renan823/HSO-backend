class Filter {

    private type: string;

    constructor (type: string) {
        this.type = type;
    }

    apply () {
        switch (this.type) {
            case "lower": 
                return (row: any[]) => row.filter((item: any) => `${item}`.toLowerCase());

            case "upper": 
                return (row: any[]) => row.filter((item: any) => `${item}`.toUpperCase());

            case "trim": 
                return (row: any[]) => row.filter((item: any) => `${item}`.trim());
            
            case "normalize": 
                return (row: any[]) => row.filter((item: any) => `${item}`.normalize("NFD"));
        }
    }
}

export default Filter;