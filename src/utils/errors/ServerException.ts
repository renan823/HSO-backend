class ServerException extends Error {

    message: string;
    status: number;

    constructor (message="Erro interno", status=500) {
        super();
        this.message = message;
        this.status = status;
    }
}

export default ServerException;