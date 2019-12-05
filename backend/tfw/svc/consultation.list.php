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
 *     "7fgN": [
 *       [
 *         4812455023,   // enter
 *         "#POSITIVE",  // "#VIH"
 *         "#CM"         // "#GEOGRAPHICAL-ORIGIN"
 *       ],
 *       ...
 *     ],
 *     ...
 *   }
 * }
 */
function execService($args)
{
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
    while ($row = $stm->fetch()) {
        $id = $row['consultation'];
        if (!isset($consultationsFields[$id])) {
            $consultationsFields[$id] = [];
        }
        $key = $row['key'];
        $value = $row['value'];
        $consultationsFields[$id][$key] = $value;
        if (!isset($fields[$key])) {
            // Not matter what value we set: we only care about the field name.
            $fields[$key] = 0;
        }
    }
    // Convert $fields from associative to straight array.
    $fields = array_keys($fields);

    // Retrieving consultation enter date and patient key.
    $stm = \Data\query("SELECT C.`id` as `id`, C.`enter` as `enter`, P.`key` as `key` "
        . "FROM " . \Data\Consultation\name() . " as C, "
        . \Data\Admission\name() . " as A, "
        . \Data\Patient\name() . " as P "
        . "WHERE C.`admission`=A.`id` "
        . "AND A.`patient`=P.`id` "
        . "AND C.`id` IN (" . implode(',', $consultationIds) . ")");
    while ($row = $stm->fetch()) {
        $key = $row['key'];
        if (!isset($patientsConsultations[$key])) {
            $patientsConsultations[$key] = [];
        }
        $consultationId = $row['id'];
        $enter = intVal($row['enter']);
        $patientsConsultations[$key][$consultationId] = $enter;
    }

    return [
        "fields" => $fields,
        "patients" => getPatientsOutput(
            $fields,
            $consultationsFields,
            $patientsConsultations
        )
    ];
}

/**
 * @param fields: { [field-key: string]: 0 }
 * @param consultationsFields: { [consultation-id: string]: {[key: string]: string} }
 * @param $patientsConsultations:
 * { [patient-key: string]: { [consultaton-id: string]: number} }
 *
 * @return
 * {
 *   "7fgN": [
 *     [
 *       4812455023,   // enter
 *       "#POSITIVE",  // "#VIH"
 *       "#CM"         // "#GEOGRAPHICAL-ORIGIN"
 *     ],
 *     ...
 *   ],
 *   ...
 * }
 */
function getPatientsOutput(&$fields, &$consultationsFields, &$patientsConsultations)
{
    $output = [];
    foreach ($patientsConsultations as $patientKey => $consultation) {
        // $consultation: { [consultaton-id: string]: number} }
        // $patient: [number, ...string][]
        $patient = [];
        foreach ($consultation as $consultationId => $consultationDate) {
            $item = [$consultationDate];
            $currentConsultationFields = $consultationsFields[$consultationId];
            foreach ($fields as $fieldKey) {
                if (array_key_exists($fieldKey, $currentConsultationFields)) {
                    $item[] = $currentConsultationFields[$fieldKey];
                } else {
                    $item[] = '';
                }
            }
            $patient[] = $item;
        }
        $output[$patientKey] = $patient;
    }

    return $output;
}
