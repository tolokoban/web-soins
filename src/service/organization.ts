import WebService from "../tfw/web-service"

export default {
    async list() {
        return await WebService.exec("orga.list");
    }
}
