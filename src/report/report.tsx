import React from "react"

import PermissiveJSON from '../tfw/permissive-json'
import FileAPI from '../tfw/fileapi'
import Button from '../tfw/view/button'
import Dialog from '../tfw/factory/dialog'
import Util from '../tfw/util'
import ReportView from './report-view'
import WS from '../tfw/web-service'
import _ from "../intl";

import LibreOfficeCalcTemplate from './report.fods'


export default { generate }


async function generate(extraData: {}) {
    const onFilesChange = async (files: FileList) => {
        for(const file of files) {
            const content = await Util.loadTextFromFile(file)
            Dialog.wait(_("generating-report"), doGenerate(content, extraData))
        }
        dialog.hide()
    }

    const dialog = Dialog.show({
        content: <ReportView
                    carecenter={extraData.carecenter}
                    onFilesChange={onFilesChange}/>,
        footer: <Button label="Close" icon="cancel" onClick={() => dialog.hide()}/>
    })

}


async function doGenerate(content: string, extraData: {}) {
    //const content = await Util.loadTextFromURL(LibreOfficeCalcTemplate)
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(content, "application/xml");
    const placeholders: HTMLElement[] = []
    findPlaceholders(doc.documentElement, placeholders)

    const query = placeholders
        .map((elem: HTMLElement) => {
            const content = (elem.textContent || '{}').trim().substr(1)
            try {
                return {
                    ...PermissiveJSON.parse(content.substr(0, content.length - 1)),
                    ...extraData
                }
            }
            catch (ex) {
                console.error(ex)
                console.info("elem=", elem);
                return { [0]: 'echo', [1]: content }
            }
        })
    console.info("query=", query);
    const data = await WS.exec("report", query)
    console.info("data=", data);

    data.forEach((text: string, index: number) => {
        const elem = placeholders[index]
        const value = parseFloat(text)
        elem.textContent = text
        if (!Number.isNaN(value)) {
            // We must tell Calc that this content is a number.
            const parent = elem.parentElement
            if (!parent) return
            parent.setAttribute("office:value-type", "float")
            parent.setAttribute("calcext:value-type", "float")
            parent.setAttribute("office:value", text)
        }
    })

    const serializer = new XMLSerializer();
    const xml = serializer.serializeToString(doc);

    await FileAPI.saveAs(new Blob([xml]), "report.ods")
}


function findPlaceholders(element: HTMLElement, placeholders: HTMLElement[]) {
    switch (element.nodeType) {
        case Node.ELEMENT_NODE:
            if (element.nodeName === 'text:p') {
                const content = (element.textContent || '').trim()
                if (content.startsWith('{{') && content.endsWith('}}')) {
                    placeholders.push(element)
                }
            } else {
                for (const child of element.childNodes) {
                    findPlaceholders(child, placeholders)
                }
            }
    }
}