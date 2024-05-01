class Filter {

    private type: string;

    constructor (type: string) {
        this.type = type;
    }

    apply () {
        switch (this.type) {
            case "lower": 
                return (row: any[]) => row.map((item: any) => `${item}`.toLowerCase());

            case "upper": 
                return (row: any[]) => row.map((item: any) => `${item}`.toUpperCase());

            case "trim": 
                return (row: any[]) => row.map((item: any) => `${item}`.trim().normalize("NFD").replace(/[^\w\s]/gi, "").replace(/\s+/g,' '));
            
            case "normalize": 
                return (row: any[]) => row.map((item: any) => `${item}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g,' ').trim());
        }
    }

    handle () {
        return (row: any[]) => row.map((item: any) => `${item}`.toLowerCase());
    }
}

export default Filter;