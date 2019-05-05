import WebService from "../tfw/web-service"
import { ICarecenter } from "../types"

export default {
    async list( organizationId: string) {
        const carecenters = await WebService.exec("carecenter.list", organizationId);
        return carecenters.map( (carecenter: ICarecenter) => Object.assign(
            carecenter, {
                organizationId
            }
        ));
    }
}
