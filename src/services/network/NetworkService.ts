import { NetworkData } from "../../domain/interfaces";
import Network from "./Network";

class NetworkService {

    constructor () {};

    async createNetwork (data: NetworkData): Promise<any[]> {
        let network = new Network();

        network.fillNetwork(data);
        
        return network.exportNetwork();
    }
}

export default NetworkService;