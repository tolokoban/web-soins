import React from "react"
import castArray from "../tfw/converter/array"
import castString from "../tfw/converter/string"
import castInteger from "../tfw/converter/integer"
import Tabstrip from "../tfw/layout/tabstrip"
import StatsPatientsConfig from "../container/stats-patients-config"
import { IStatsConfig } from "../types"
import _ from "../intl"

interface IStatsConfigProps extends IStatsConfig {
    onTypeChange?: (type: string) => void;
    onDateMinChange?: (date: number) => void;
    onDateMaxChange?: (date: number) => void;
}

export default class StatsConfig extends React.Component<IStatsConfigProps, {}> {
    constructor(props: IStatsConfigProps) {
        super(props);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDateMinChange = this.handleDateMinChange.bind(this);
        this.handleDateMaxChange = this.handleDateMaxChange.bind(this);
    }

    handleTypeChange(index: number) {
        const handler = this.props.onTypeChange;
        if (typeof handler !== 'function') return;
        handler(index === 0 ? 'patients' : 'consultations');
    }

    handleDateMinChange(date: number) {
        const handler = this.props.onDateMinChange;
        if (typeof handler !== 'function') return;
        handler(date);
    }

    handleDateMaxChange(date: number) {
        const handler = this.props.onDateMaxChange;
        if (typeof handler !== 'function') return;
        handler(date);
    }

    render() {
        const p = this.props;
        const type = castString(p.statsType, "patients");
        const value = type === "patients" ? 0 : 1;
        const dateMin = castInteger(p.dateMin, Date.now());
        const dateMax = castInteger(p.dateMax, Date.now());

        return (
            <Tabstrip
                value={value}
                headers={[_("patients"), _("consultations")]}
                onChange={this.handleTypeChange}
            >
                <StatsPatientsConfig
                    dateMin={dateMin}
                    dateMax={dateMax} />
                <div>Not implemented yet!</div>
            </Tabstrip>
        )
    }
}
