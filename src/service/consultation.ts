import Tfw from 'tfw'

export interface IConsultation { }

export default {
    async get(consultationId: number): Promise<IConsultation> {
        const result = await Tfw.WebService.exec(
            "consultation.list", [consultationId]
        )
        console.info("result=", result)
        return {}
    }
}
