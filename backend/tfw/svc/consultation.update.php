<?php
$ROLE = "";

include_once("./data.php");

/**
 * Input:
 * {
 *   patientKey: string,
 *   oldDate: number,
 *   newDate: number,
 *   data: { [key: string]: string }
 * }
 *
 * Output:
 * 0: everything is ok
 *
 * Error:
 * -1: Missing argument "patientKey"
 * -2: Missing argument "oldDate"
 * -3: Missing argument "newDate"
 * -4: Missing argument "data"
 * -5: Consultation not found
 */
function execService($args)
{
    if( !array_key_exists( 'patientKey', $args ) ) return -1;
    if( !array_key_exists( 'oldDate', $args ) ) return -2;
    if( !array_key_exists( 'newDate', $args ) ) return -3;
    if( !array_key_exists( 'data', $args ) ) return -4;

    $patientKey = $args["patientKey"];
    $oldDate = intval($args["oldDate"]);
    $newDate = intval($args["newDate"]);
    $data = $args["data"];

    $sql = "SELECT C.id, A.id "
         . "FROM " . \Data\Consultation\name() ." AS C, "
         . \Data\Patient\name() ." AS P, "
         . \Data\Admission\name() ." AS A "
         . "WHERE A.patient = P.id "
         . "AND C.admission = A.id "
         . "AND P.key = ? "
         . "AND C.enter = ? ";
    $row = \Data\fetch( $sql, $patientKey, $oldDate );
    $consultationId = intval($row[0]);
    $admissionId = intval($row[1]);

    // Update consultation date.
    \Data\exec("UPDATE " . \Data\Consultation\name()
        . " SET `enter`=? WHERE `id`=?",
        $newDate, $consultationId);

    return 0;
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
