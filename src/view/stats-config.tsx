import React from "react"
import Actions from "../state/stats-config"
import State from "../state"
import castString from "tololib/converter/string"
import castInteger from "tololib/converter/integer"
import Flex from "tololib/layout/flex"
import Combo from "tololib/view/combo"
import InputDate from "tololib/view/input-date"
import Translate from "../intl"

export default function StatsConfig() {
    const types = ["consultations", "patients"]
    const dateMin = castInteger(
        State.useSelector(state => state.statsConfig.dateMin),
        Date.now()
    )
    const dateMax = castInteger(
        State.useSelector(state => state.statsConfig.dateMax),
        Date.now()
    )
    const type = castString(
        State.useSelector(state => state.statsConfig.statsType),
        types[0]
    )
    return (
        <div>
            <Combo wide={true} label={Translate.statType} keys={types} value={type}>
                {types.map(type => (
                    <div key={type}>{Translate.type}</div>
                ))}
            </Combo>
            <Flex>
                <div>
                    <InputDate
                        label={Translate.dateMin}
                        onChange={Actions.setDateMin}
                        value={dateMin}
                    />
                </div>
                <div>
                    <InputDate
                        label={Translate.dateMax}
                        onChange={Actions.setDateMax}
                        value={dateMax}
                    />
                </div>
            </Flex>
        </div>
    )
}
