class ExtensionValidator {

    private extensions: string[];

    constructor () {
        this.extensions = ["xlsx"];
    }

    isValid (extension: string): boolean {
        return this.extensions.includes(extension);
    }
}

export default ExtensionValidator;