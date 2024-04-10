import { readdir } from "fs/promises";
import path from "../../utils/path";

class FileService {

    constructor () {};

    async listAll (): Promise<string[]> {
        const files: string[] = await readdir(path);

        return files;
    }
}

export default FileService;