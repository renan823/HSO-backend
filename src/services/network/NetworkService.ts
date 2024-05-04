import { SerializedGraph } from "graphology-types";
import Network from "./Network";

class NetworkService {

    constructor () {};

    async createNetwork (data: any): Promise<SerializedGraph> {
        return new Network().export();
    }
}

export default NetworkService;