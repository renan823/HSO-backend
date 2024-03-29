class ExtensionValidator {

    private extensions: string[];

    constructor () {
        this.extensions = ["csv"];
    }

    isValid (extension: string): boolean {
        return this.extensions.includes(extension);
    }
}