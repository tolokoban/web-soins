import React from "react"

import { IFilter } from "../../types"
import Button from "../../tfw/view/button"
import Flex from "../../tfw/layout/flex"
import InputDate from "../../tfw/view/input-date"
import PermissiveJSON from '../../tfw/permissive-json'
import Storage from "../../tfw/storage"

import "./consultation-query.css"

import _ from "../../intl"

interface TContainerQueryProps {
    onQueryClick: (filter: IFilter, dateMin: number, dateMax: number) => void
}

interface TContainerQueryState {
    query: string,
    valid: boolean,
    dateMin: number,
    dateMax: number
}

export default class ContainerQuery extends React.Component<TContainerQueryProps, TContainerQueryState> {
    constructor( props: TContainerQueryProps ) {
        super(props)
        this.state = {
            dateMin: Storage.local.get('web-soins/container-query/dateMin', oneYearBack()),
            dateMax: Storage.local.get('web-soins/container-query/dateMax', Date.now()),
            valid: true,
            query: Storage.local.get('web-soins/container-query/query', `[
    OR
    [= #VIH #POSITIVE]
    [= #DIAGNOSIS-VIH #POSITIVE]
]`)
        }
    }

    private handleQueryChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = evt.target
        if (!target) return
        const query = target.value as string
        const valid = PermissiveJSON.isValid(query)
        this.setState({ query, valid })
    }

    private handleExecuteClick = () => {
        const { query, valid, dateMin, dateMax } = this.state
        if (valid) {
            Storage.local.set('web-soins/container-query/query', query)
            const { onQueryClick } = this.props
            onQueryClick(PermissiveJSON.parse(query), dateMin, dateMax)
        }
    }

    private handleDateMinChange = (dateMin: number) => {
        this.setState({ dateMin })
    }

    private handleDateMaxChange = (dateMax: number) => {
        this.setState({ dateMax })
    }

    render() {
        const { query, valid, dateMin, dateMax } = this.state
        const classes = ['presentational-ConsultationQuery']

        return (<div className={classes.join(' ')}>
            <Flex>
                <div><InputDate
                    label={_("date-min")}
                    onChange={this.handleDateMinChange}
                    value={dateMin} /></div>
                <div><InputDate
                    label={_("date-max")}
                    onChange={this.handleDateMaxChange}
                    value={dateMax} /></div>
            </Flex>
            <label>{_('filter')}</label><br/>
            <textarea className={valid ? 'valid' : 'invalid'}
                      rows={15}
                      onChange={this.handleQueryChange}>{
                query
            }</textarea><br/>
            <Button icon="play" label={_('execute-query')} enabled={valid} onClick={this.handleExecuteClick}/>
        </div>)
    }
}

/**
 * Return a date that is between one and two years old.
 * Then fix the month to January and the day to 1st.
 */
function oneYearBack() {
    const now = new Date()
    const date = new Date(
        now.getFullYear() - 1,
        0,  // January
        1
    )
    return date.valueOf()
}
