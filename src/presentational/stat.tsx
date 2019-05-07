import * as React from "react"
import { IStatsConfig } from "../types"
import Flex from "../tfw/layout/flex"
import Icon from "../tfw/view/icon"
import StatService from "../service/stat"

import "./stat.css"

interface IStatProps {
    stat: IStatsConfig;
}

interface IStatState {
    data?: {}
}

export default class Stat extends React.Component<IStatProps, IStatState> {
    constructor(props: IStatProps) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
        if (this.state.data) return;
        console.log("componentDidUpdate");
        this.refresh();
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.refresh();
    }

    async refresh() {
        const data = await StatService.extract(this.props.stat);
        console.info("data=", data);
        this.setState({ data });
    }

    render() {
        const stat: IStatsConfig = this.props.stat;
        const data: {} | undefined = this.state.data;
        let dataView = null;
        if (data) {
            dataView = <pre>{JSON.stringify(data, null, "  ")}</pre>;
        } else {
            dataView = (<Flex>
                <Icon content="wait" animate={true} /><div>{"Chargement en cours..."}</div>
            </Flex>);
        }
        return (
            <div className="presentational-stat thm-ele-card thm-bg1">
                <div className="thm-bgPD">{`${stat.carecenter.name}, du ${formatDate(stat.dateMin)} au ${formatDate(stat.dateMax)}`}</div>
                <div>{dataView}</div>
            </div>
        );
    }
}


function formatDate(date: number): string {
    const d = new Date(date);
    return `${d.getDate()}-${1 + d.getMonth()}-${d.getFullYear()}`;
}
