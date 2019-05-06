import WebService from "../tfw/web-service"
import { IStructure } from "../types"

export default {
    async list( organizationId: number) {
        const structures = await WebService.exec("structure.list", organizationId);
        return structures.map( (structure: IStructure) => Object.assign(
            structure, {
                organizationId
            }
        ));
    }
}
