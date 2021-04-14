import React from "react"

import PermissiveJSON from "tololib/permissive-json"
import FileAPI from "tololib/fileapi"
import Icon from "tololib/view/icon"
import Button from "tololib/view/button"
import Dialog from "tololib/factory/dialog"
import Util from "tololib/util"
import ReportView from "./report-view"
import WS from "tololib/web-service"
import Intl from "../intl"

import LibreOfficeCalcTemplate from "./report.fods"

import "./report.css"

export default {
    doGenerate,
    generate,
    generateFromTemplate,
    generateFromUserProvidedFile
}

interface ExtraData {
    carecenter?: number
}

async function generate(extraData: ExtraData) {
    Dialog.alert(
        <div className="report-icons-container">
            <div>
                <Icon
                    content="report"
                    size={96}
                    onClick={() => generateFromTemplate(extraData)}
                />
                <div>Rapport annuel</div>
            </div>
            <div>
                <Icon
                    content="file"
                    size={96}
                    onClick={() => generateFromUserProvidedFile(extraData)}
                />
                <div>
                    <i>Générique...</i>
                </div>
            </div>
        </div>
    )
}

async function generateFromTemplate(extraData: ExtraData) {
    const content = await Dialog.wait(
        Intl.loadingReport,
        Util.loadTextFromURL(LibreOfficeCalcTemplate)
    )
    Dialog.wait(Intl.generatingReport, doGenerate(content, extraData))
}

function generateFromUserProvidedFile(extraData: ExtraData) {
    const onFilesChange = async (files: FileList) => {
        for (const file of files) {
            const content = await Util.loadTextFromFile(file)
            Dialog.wait(Intl.generatingReport, doGenerate(content, extraData))
        }
        dialog.hide()
    }

    const dialog = Dialog.show({
        content: (
            <ReportView
                carecenter={extraData.carecenter ?? 0}
                onFilesChange={onFilesChange}
            />
        ),
        footer: <Button label="Close" icon="cancel" onClick={() => dialog.hide()} />
    })
}

async function doGenerate(content: string, extraData: ExtraData) {
    //const content = await Util.loadTextFromURL(LibreOfficeCalcTemplate)
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(content, "application/xml")
    const placeholders: HTMLElement[] = []
    findPlaceholders(doc.documentElement, placeholders)

    const query = placeholders.map((elem: HTMLElement) => {
        const content = (elem.textContent || "{}").trim().substr(1)
        try {
            return {
                ...PermissiveJSON.parse(content.substr(0, content.length - 1)),
                ...extraData
            }
        } catch (ex) {
            console.error(ex)
            console.info("elem=", elem)
            return { [0]: "echo", [1]: content }
        }
    })
    console.info("query=", query)
    const data = await WS.exec("report", query)
    console.info("data=", data)

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

    const serializer = new XMLSerializer()
    const xml = serializer.serializeToString(doc)

    await FileAPI.saveAs(new Blob([xml]), "report.ods")
}

function findPlaceholders(element: Element, placeholders: Element[]) {
    switch (element.nodeType) {
        case Node.ELEMENT_NODE:
            if (element.nodeName === "text:p") {
                const content = (element.textContent || "").trim()
                if (content.startsWith("{{") && content.endsWith("}}")) {
                    placeholders.push(element)
                }
            } else {
                for (const child of element.childNodes) {
                    if (child.nodeType !== Node.ELEMENT_NODE) continue

                    findPlaceholders(child as Element, placeholders)
                }
            }
    }
}
