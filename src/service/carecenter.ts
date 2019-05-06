import WebService from "../tfw/web-service"
import { ICarecenter } from "../types"

interface IServiceCarecenter {
    id: number;
    name: string;
    code: string;
    patientsCount: number;
    consultationsCount: number;
    structure: number;
}

export default {
    async list( organizationId: number) : Promise<ICarecenter[]> {
        const carecenters = await WebService.exec("carecenter.list", organizationId);
        return carecenters.map( (carecenter: IServiceCarecenter) => ({
            id: carecenter.id,
            name: carecenter.name,
            code: carecenter.code,
            patientsCount: carecenter.patientsCount,
            consultationsCount: carecenter.consultationsCount,
            structureId: carecenter.structure,
            organizationId
        }));
    }
}
