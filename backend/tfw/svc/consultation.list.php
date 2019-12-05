<?php
$ROLE = "USER";

include_once("./data.php");

/**
 * Input:
 * Array of consultations IDs.
 *
 * Output:
 * {
 *   fields: ["#VIH", "#GEOGRAPHICAL-ORIGIN"],
 *   patients: {
 *     "7fgN": {
 *       [
 *         [
 *           4812455023,   // enter
 *           "#POSITIVE",  // "#VIH"
 *           "#CM"         // "#GEOGRAPHICAL-ORIGIN"
 *         ],
 *         ...
 *       ]
 *     },
 *     ...
 *   }
 * }
 */
function execService( $args ) {
    $consultationIds = $args;

    // Associative array used as a set for data keys.
    $fields = [];
    // Associative array for consultations data.
    // Key is consultation id, value is an associative array of all the data.
    $consultationsFields = [];
    // Associative array for consultations per patient.
    // Key is patient key, value is { <consultation-id>: number /* enter date */, ... }.
    $patientsConsultations = [];

    // Retrieving data per consultation.
    $stm = \Data\query("SELECT `consultation`, `key`, `value` "
        . "FROM " . \Data\Data\name() . " "
        . "WHERE consultation IN (" . implode(',', $consultationIds) . ") "
        . "ORDER BY consultation, `key`");
    while($row = $stm->fetch()) {
        $id = $row['consultation'];
        if (!is_set($consultationsFields[$id])) {
            $consultationsFields[$id] = [];
        }
        $key = $row['key'];
        $value = $row['value'];
        $consultationsFields[$id][$key] = $value;
        if (!is_set($fields[$key])) {
            // Not matter what value we set: we only care about the field name.
            $fields[$key] = 0;
        }
    }

    // Retrieving consultation enter date and patient key.
    $stm = \Data\query("SELECT C.`id` as `id`, C.`enter` as `enter`, P.`key` as `key` "
        . "FROM " . \Data\Consultation\name() . " as C, "
        . \Data\Patient\name() . " as P "
        . "WHERE C.`patient`=P.`id` "
        . "AND C.`id` IN (" . implode(',', $consultationIds) . ")");
    while($row = $stm->fetch()) {
        $key = $row['key'];
        if (!is_set($patientsConsultations[$key])) {
            $patientsConsultations[$key] = [];
        }
        $consultationId = $row['id'];
        $enter = intVal($row['enter']);
        $patientsConsultations[$key][$consultationId] = $enter;
    }

    return [
        "fields" => $fields,
        "patients" => getPatientsOutput(
            $fields, $consultationsFields, $consultationsDateAndPatient
        )
    ];
}

/**
 * @param $fields: { [field-key: string]: 0 }
 * @param $consultationsFields: { [consultation-id: string]: {[key: string]: string} }
 * @param $consultationsDateAndPatient:
 * { [patient-key: string]: {[consultaton-id: string]: number} }
 *
 * Return something like that:
 * {
 *   "7fgN": {
 *     [
 *       [
 *         4812455023,   // enter
 *         "#POSITIVE",  // "#VIH"
 *         "#CM"         // "#GEOGRAPHICAL-ORIGIN"
 *       ],
 *       ...
 *     ]
 *   },
 *   ...
 * }
 */
function getPatientsOutput(&$fields, &$consultationsFields, &$consultationsDateAndPatient) {

}
?>
