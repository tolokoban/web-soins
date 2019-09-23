import PermissiveJSON from '../tfw/permissive-json'
import Placeholder from '../util/placeholder'
import FileAPI from '../tfw/fileapi'
import Dialog from '../tfw/factory/dialog'
import Util from '../tfw/util'
import WS from '../tfw/web-service'
import _ from "../intl";

import LibreOfficeCalcTemplate from './report.fods'


export default { generate }


async function generate(extraData: {}) {
    Dialog.wait(_("generating-report"), doGenerate(extraData))
}


async function doGenerate(extraData: {}) {
    const content = await Util.loadTextFromURL(LibreOfficeCalcTemplate)
    const data = Placeholder.parse(content)
    const placeholders = await WS.exec(
        "report",
        data.placeholders
            .map((p: string) => {
                try {
                    return {
                        ...PermissiveJSON.parse(`{${p}}`),
                        ...extraData
                    }
                }
                catch (ex) {
                    console.error(ex)
                    console.info("p=", p);
                    return { [0]: 'echo', [1]: p }
                }
            })
    )

    let combined: string[] = []
    for (let index = 0 ; index < data.sections.length ; index++) {
        combined.push(data.sections[index])
        if (index < placeholders.length - 1) {
            combined.push(placeholders[index])
        }
    }

    await FileAPI.saveAs(new Blob([combined.join('')]), "report.ods")
}
