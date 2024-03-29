import React from "react"
import Checkbox from "tololib/view/checkbox"
import InputDate from "tololib/view/input-date"
import Flex from "tololib/layout/flex"
import castInteger from "tololib/converter/integer"

import _ from "../intl"

interface IStatsPatientsConfigProps {
    fields: {
        [key: string]: boolean;
    };
    fieldsCaptions: {
        [key: string]: string;
    }
    dateMin?: Date;
    dateMax?: Date;
    onFieldChange?: (fieldName: string, isSelected: boolean) => void;
    onDateMinChange?: (date: Date) => void;
    onDateMaxChange?: (date: Date) => void;
}

export default class StatsConfig extends React.Component<IStatsPatientsConfigProps, {}> {
    constructor(props: IStatsPatientsConfigProps) {
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleDateMinChange = this.handleDateMinChange.bind(this);
        this.handleDateMaxChange = this.handleDateMaxChange.bind(this);
    }

    handleFieldChange(fieldName: string, isSelected: boolean) {
        const handler = this.props.onFieldChange;
        if (typeof handler !== 'function') return;
        try {
            handler(fieldName, isSelected);
        } catch (ex) {
            console.error("Error in handleFieldChange(fieldName, isSelected): ", fieldName, isSelected);
            console.error(ex);
        }
    }

    handleDateMinChange(date: Date) {
        const handler = this.props.onDateMinChange;
        if (typeof handler !== 'function') return;
        try {
            handler(date);
        } catch (ex) {
            console.error("Error in handleDateMinChange(date): ", date);
            console.error(ex);
        }
    }

    handleDateMaxChange(date: Date) {
        const handler = this.props.onDateMaxChange;
        if (typeof handler !== 'function') return;
        try {
            handler(date);
        } catch (ex) {
            console.error("Error in handleDateMaxChange(date): ", date);
            console.error(ex);
        }
    }

    render() {
        const p = this.props;
        const fields = p.fields;
        const captions = p.fieldsCaptions;
        const handleFieldChange = this.handleFieldChange;
        const dateMin = castInteger(p.dateMin, Date.now());
        const dateMax = castInteger(p.dateMax, Date.now());

        return (
            <div>
                <div>{
                    Object.keys(fields).map((fieldName: string) => {
                        const fieldCaption = captions[fieldName];
                        if (typeof fieldCaption !== 'string') return null;
                        const isSelected = fields[fieldName];
                        return <Checkbox wide={true}
                            key={fieldName}
                            value={isSelected}
                            label={fieldCaption}
                            onChange={(selected: boolean) => handleFieldChange(fieldName, selected)} />
                    })
                }</div>
            </div>
        )
    }
}
