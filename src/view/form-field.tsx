import React from "react"
import { IFormField, ITypes, IType } from '../types'
import Combo from 'tololib/view/combo'
import Expand from 'tololib/view/expand'
import Checkbox from 'tololib/view/checkbox'
import InputDate from 'tololib/view/input-date'
import Storage from 'tololib/storage'

import "./form-field.css"

interface IFormFieldProps {
    field: IFormField,
    types: ITypes
}

interface IFormFieldState {
    values: { [key: string]: any }
}

export default class FormField extends React.Component<IFormFieldProps, IFormFieldState> {
    constructor( props: IFormFieldProps ) {
        super( props );
        this.state = { values: Storage.local.get("web-soins/form-field/values", {}) }
    }

    setValue = (key: string, val: any) => {
        const values = {
            ...this.state.values,
            [key]: val
        }

        Storage.local.set("web-soins/form-field/values", values)
        this.setState({ values }, () => {
            console.info("key, val, values=", key, val, values);
        })
    }

    render() {
        return (<div className="FormField">{
            this.renderField(this.props.field)
        }</div>)
    }

    renderField = (field: IFormField): React.ReactNode => {
        const { id, caption, children } = field
        if (id.charAt(0) === '#') {
            return this.renderTypedField(field, this.props.types)
        }
        return <Expand  key={id}
                        label={caption}
                        value={this.state.values[id]}
                        onValueChange={(value: boolean) => this.setValue(id, value)}>
                    <div>{
                        Object.values(children).map(this.renderField)
                    }</div>
                </Expand>
    }

    renderTypedField(field: IFormField, types: ITypes): React.ReactNode {
        const { id, caption, tags } = field
        const typeId = field.type || '?'
        const type = types[typeId]

        if (!type) {
            if (Array.isArray(tags)) {
                if (tags.indexOf("@BOOL")) {
                    return <Checkbox key={id}
                                label={`${caption} (${id})`}
                                value={this.state.values[id]}
                                onChange={(v: boolean) => this.setValue(id, v)}/>
                }
                if (tags.indexOf("@DATE")) {
                    return <InputDate key={id}
                                label={`${caption} (${id})`}
                                value={this.state.values[id]}
                                onChange={(v: number) => this.setValue(id, v)}/>
                }
            }
            return <pre key={id} className="error">{
                JSON.stringify(field, null, '  ')
                + "\nTAGS: " + JSON.stringify(tags)
            }</pre>
        }

        return <Combo key={id}
                    label={`${caption} (${id})`}
                    value={this.state.values[id]}
                    onChange={(v: string) => this.setValue(id, v)}>{
            Object.values(type.children).map((t: IType) => (
                <div key={t.id}>{t.caption} <em>({t.id})</em></div>
            ))
        }</Combo>
    }
}
