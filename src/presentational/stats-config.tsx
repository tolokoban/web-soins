import React from "react"
import castArray from "../tfw/converter/array"
import castString from "../tfw/converter/string"
import castInteger from "../tfw/converter/integer"
import Tabstrip from "../tfw/layout/tabstrip"
import StatsPatientsConfig from "./stats-patients-config"
import _ from "../intl"

interface IStatsConfig {
    type: "patients" | "consultations";
}

interface IStatsConfigProps extends IStatsConfig {
    onTypeChange?: (type: string) => void;
}

export default class StatsConfig extends React.Component<IStatsConfigProps, {}> {
    constructor(props: IStatsConfigProps) {
        super(props);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    handleTypeChange(type: string) {
        const handler = this.props.onTypeChange;
        if (typeof handler !== 'function') return;
        handler(type);
    }

    render() {
        const p = this.props;
        const type = castString(p.type, "patients");
        const value = type === "patients" ? 0 : 1;

        return (
            <Tabstrip
                value={value}
                headers={[_("patients"), _("consultations")]}
                onChange={this.handleTypeChange}
            >
                <StatsPatientsConfig
                    fields={{
                        birthday: true,
                        size: false,
                        nationality: true
                    }}
                    types={{
                        birthday: "Date de naissance",
                        size: "Taille",
                        nationality: "Nationalité"
                    }} />
                <div>Not implemented yet!</div>
            </Tabstrip>
        )
    }
}
