import * as React from "react"
import { IStatsConfig, IStructure, IOccurences } from "../types"
import Pie from "./pie"
import Flex from "../tfw/layout/flex"
import Icon from "../tfw/view/icon"
import Combo from "../tfw/view/combo"
import Button from "../tfw/view/button"
import FileAPI from "../tfw/fileapi"
import Structure from "../structure"
import StatService from "../service/stat"

import Intl from "../tfw/intl"
const _ = Intl.make(require("./stat.yaml"));

import "./stat.css"

const DEFAULT_COLORS = ["#b37036", "#cc7529", "#e67717", "#ff7700", "#765"];

type TDataFromService = { [key: string]: IOccurences };

interface IStatProps {
    stat: IStatsConfig;
    structure: IStructure;
}

interface IStatState {
    dataFromService?: TDataFromService;
    selectedField: string;
}

export default class Stat extends React.Component<IStatProps, IStatState> {
    constructor(props: IStatProps) {
        super(props);
        this.state = { selectedField: "" };
    }

    componentDidUpdate() {
        if (this.state.dataFromService) return;
        console.log("componentDidUpdate");
        this.refresh();
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.refresh();
    }

    async refresh() {
        const dataFromService = await StatService.extract(this.props.stat);
        console.info("data=", dataFromService);
        this.setState({ dataFromService });
    }

    private export() {
        const data: TDataFromService | undefined = this.state.dataFromService;
        if (!data) return;
        const { keys, values } = getFieldsKeysAndValues(data, this.props.structure);
        const output: string[] = ["Code du champ\tNom du champ\tValeur\tOccurences"];
        keys.forEach((fieldKey: string, idx: number) => {
            const fieldCaption = values[idx];
            const occurences = data[fieldKey].occ;
            occurences.forEach(([caption, count]: [string, number]) => {
                output.push(`${fieldKey}\t${fieldCaption}\t${caption}\t${count}`);
            })
        });

        const filename = "statistics.xls";
        FileAPI.saveAs(new Blob([output.join("\n")], { type: "text/csv" }), filename);
    }

    render() {
        const data: TDataFromService | undefined = this.state.dataFromService;
        let content = null;
        if (!data) {
            content = (<Flex>
                <Icon content="wait" animate={true} /><div>{"Chargement en cours..."}</div>
            </Flex>);
        } else {
            const { keys, values } = getFieldsKeysAndValues(data, this.props.structure);
            let value = this.state.selectedField;
            if (keys.indexOf(value) === -1) value = keys[0];
            const occurences = data[value];
            content = (<div>
                <Combo
                    keys={keys}
                    onChange={selectedField => {
                        console.info("[onChange] selectedField=", selectedField);
                        this.setState({ selectedField });
                    }}
                    value={value}>{
                        values.map((val, idx) => {
                            const key = keys[idx];
                            return <div key={key}><b>{`${val} `}</b><small className='grey'>{key}</small></div>
                        })
                    }</Combo>
                <br />
                <center>
                    <Pie colors={DEFAULT_COLORS}
                        values={getValuesForPie(occurences)} />
                </center>
                <div>{
                    occurences.occ.map(([caption, count], index) => {
                        const colorIndex = Math.min(DEFAULT_COLORS.length - 1, index);
                        const color = DEFAULT_COLORS[colorIndex];
                        return (
                            <Flex key={index}
                                justifyContent="space-between"
                                alignItems="center"
                                dir="row"
                                classes={index % 2 ? "thm-bg1" : "thm-bg2"}>
                                <Flex
                                    justifyContent="space-between"
                                    wide={false}
                                    dir="row"
                                    alignItems="center">
                                    <div className="bullet" style={{
                                        background: color
                                    }}></div>
                                    <span>{caption}</span>
                                </Flex>
                                <div><b>{count}</b></div>
                            </Flex>
                        )
                    })
                }</div>
                <Button
                    wide={true}
                    icon="export"
                    label={_("export")}
                    onClick={() => this.export()} />
            </div >);
        }

        const stat: IStatsConfig = this.props.stat;
        return (
            <div className="presentational-stat thm-ele-card thm-bg1">
                <div className="thm-bgPD">{`${stat.carecenter.name}, du ${formatDate(stat.dateMin)} au ${formatDate(stat.dateMax)}`}</div>
                <div>{content}</div>
            </div>
        );
    }
}


function getFieldsKeysAndValues(data: TDataFromService, structure: IStructure): { keys: string[], values: string[] } {
    const keys = Object.keys(data);
    const values = keys.map(key => Structure.getFieldCaption(key, structure));
    const array = keys.map((key, index) => [key, values[index]]);
    array.sort((a, b) => {
        const A = a[1];
        const B = b[1];
        if (A < B) return -1;
        if (A > B) return +1;
        return 0;
    });

    return {
        keys: array.map(item => item[0]),
        values: array.map(item => item[1])
    };
}

function formatDate(date: number): string {
    const d = new Date(date);
    return `${d.getDate()}-${1 + d.getMonth()}-${d.getFullYear()}`;
}


function getValuesForPie(occurences: IOccurences, sectors: number = 4): number[] {
    const { sum, occ } = occurences;
    const values: number[] = [];
    let total = 0;
    for (let i = 0; i < Math.min(sectors, occ.length); i++) {
        const [, count] = occ[i];
        values.push(count);
        total += count;
    }
    if (sum > total) values.push(sum - total);
    return values;
}
