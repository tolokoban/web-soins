import FileAPI from '../tfw/fileapi'
import Dialog from '../tfw/factory/dialog'
import Util from '../tfw/util'
import _ from "../intl";

import LibreOfficeCalcTemplate from './report.fods'


export default { generate }


async function generate() {
    Dialog.wait(_("generating-report"), doGenerate())
}


async function doGenerate() {
    const content = await Util.loadTextFromURL(LibreOfficeCalcTemplate)

    await FileAPI.saveAs(new Blob([content]), "report.ods")
}
