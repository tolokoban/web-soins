import WebService from "tololib/web-service"

export default {
    async list() {
        return await WebService.exec("orga.list");
    }
}
