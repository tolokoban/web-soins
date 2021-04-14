import React from "react"
import Tfw from 'tololib'
import Report from '../../report'
import Intl from '../../intl'
import Section from '../section'
import "./counting-reports.css"

const Button = Tfw.View.Button
const Dialog = Tfw.Factory.Dialog
const InputFile = Tfw.View.InputFile
const _ = Tfw.Intl.make(require("./counting-reports.yaml"))

interface ICountingReportsProps {
    className?: string[]
}
interface ICountingReportsState { }

export default class CountingReports extends React.Component<ICountingReportsProps, ICountingReportsState> {
    state = {}

    handleFilesChange = async (files: FileList) => {
        for (const file of files) {
            const content = await Tfw.Util.loadTextFromFile(file)
            Dialog.wait(Intl.generatingReport, Report.doGenerate(content, {}))
        }
    }

    render() {
        const classes = [
            'view-CountingReports',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <Button
                label="Rapport annuel"
                icon="report"
                onClick={() => Report.generateFromTemplate({})}
            />
            <Button
                label="Ajouter un nouveau rapport"
                enabled={false}
                icon="add"
                color="S"
                onClick={() => Report.generateFromUserProvidedFile({})}
            />
            <InputFile
                icon="import"
                label="Importer un fichier"
                accept="fods"
                flat={true}
                multiple={true}
                onClick={this.handleFilesChange}
            />
            <Section label="Documentation" default={false} background="thm-bg2">
                <div>
                    <p dangerouslySetInnerHTML={{
                        __html: Intl.hintReportTemplates
                    }}></p>
                    <ul>
                        <li>
                            <code>{'{{newPatients [Y,1,1] [Y,4,1]}}'}</code>:<br />
                            <span className="hint">
                                Nombre de nouveaux patients entre le 1<sup>er</sup> janvier de cette année et le 1<sup>er</sup> avril.
                    </span>
                        </li>
                        <li>
                            <code>{'{{newPatients [Y,1,1] [Y,4,1] filter:[GENDER #F]}}'}</code>:<br />
                            <span className="hint">
                                Nombre de nouveaux patients entre le 1<sup>er</sup> janvier de cette année et le 1<sup>er</sup> avril de sexe féminin.
                    </span>
                        </li>
                        <li>
                            <code>{'{{newPatients [Y,1,1] [Y,4,1] filter:[age 18 40]}}'}</code>:<br />
                            <span className="hint">
                                Nombre de nouveaux patients entre le 1<sup>er</sup> janvier de cette année et le 1<sup>er</sup> avril agée de 18 à 40 ans.
                    </span>
                        </li>
                        <li>
                            <code>{'{{visits [Y,1,1] [Y,4,1]}}</code>'}</code>:<br />
                            <span className="hint">
                                Nombre de consultations entre le 1<sup>er</sup> janvier de cette année et le 1<sup>er</sup> avril.
                    </span>
                        </li>
                        <li>
                            <code>{'{{visits [Y,1,1] [Y,4,1] filter:{MOTIF-CONSULTATION: #GENITAL-LEAK}}}'}</code>:<br />
                            <span className="hint">
                                Nombre de consultations entre le 1<sup>er</sup> janvier de cette année et le 1<sup>er</sup> avril dont le motif de consultation est <b>genital leak</b>.
                    </span>
                        </li>
                        <li>
                            <code>{'{{visits [Y,1,1] [Y,4,1] group:day}}'}</code>:<br />
                            <span className="hint">
                                Nombre de jours de consultations entre le 1<sup>er</sup> janvier de cette année et le 1<sup>er</sup> avril.
                    </span>
                        </li>
                    </ul>
                </div>
            </Section>
        </div>)
    }
}
