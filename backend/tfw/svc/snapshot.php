<?php
$ROLE = "";

include_once("./data.php");

/**
 * # Return codes:
 *  -1: Bad arg: expected <carecenterID>-<code>.
 */
function execService( $args ) {
    $items = parseCode( $args );
    if( $items == 0 ) return -1;
    $carecenterId = $items["id"];
    $secretCode = $items["code"];

    $output = [
        "index" => [
            "count" => 0,
            "records" => []
        ],
        "list" => []
    ];

    $patientIds = Data\Carecenter\getPatients($carecenterId);
    $output["index"]["count"] = count($patientIds);
    foreach ($patientIds as $patientId) {
        $patient = \Data\Patient\get($patientId);
        $key = "" . $patient["key"];
        $output["index"]["records"][$key] = [
            "id" => $patient["key"]
        ];
        $fieldIds = \Data\Patient\getFields($patientId);
        foreach ($fieldIds as $fieldId) {
            $field = Data\PatientField\get($fieldId);
            $output["index"]["records"][$key][$field["key"]] =
                $field["value"];
        }
        $output["list"][$patient["key"]] = [
            "id" => $key,
            "created" => intVal($patient["created"]),
            "edited" => intVal($patient["edited"]),
            "data" => $output["index"]["records"][$key],
            "admissions" => getAdmissions($patientId),
            "vaccins" => getVaccins($patientId),
            "exams" => [],
            "picture" => null,
            "attachements" => []
        ];
    }

    return $output;
}

function getAdmissions($patientId) {
    $admissions = [];
    $admissionIds = \Data\Patient\getAdmissions($patientId);
    foreach ($admissionIds as $admissionId) {
        $admission = \Data\Admission\get($admissionId);
        $admissions[] = [
            "enter" => intVal($admission["enter"]),
            "visits" => getConsultations($admissionId)
        ];
    }
    return $admissions;
}

function getConsultations($admissionId) {
    $consultations = [];
    $consultationIds = \Data\Admission\getConsultations($admissionId);
    foreach ($consultationIds as $consultationId) {
        $consultation = \Data\Consultation\get($consultationId);
        $consultations[] = [
            "enter" => intVal($consultation["enter"]),
            "exit" => intVal($consultation["exit"]),
            "data" => getData($consultationId)
        ];
    }
    return $consultations;
}

function getData($consultationId) {
    $datas = [];
    $dataIds = \Data\Consultation\getDatas($consultationId);
    foreach ($dataIds as $dataId) {
        $data = \Data\Data\get($dataId);
        $datas[$data["key"]] = $data["value"];
    }
    return $datas;
}

function getVaccins($patientId) {
    $vaccins = [];
    $vaccinIds = \Data\Patient\getVaccins($patientId);
    foreach ($vaccinIds as $vaccinId) {
        $vaccin = \Data\Vaccin\get($vaccinId);
        $vaccins[] = [
            "key" => $vaccin["key"],
            "date" => intVal($vaccin["date"]),
            "lot" => $vaccin["lot"]
        ];
    }
    return $vaccins;
}


function parseCode( $code ) {
    $index = strpos( $code, '-' );
    if( $index === FALSE ) {
        error_log("[synchro] parseCode: '-' not found in '$code'!");
        return null;
    }

    $id = intval( substr( $code, 0, $index ) );
    $code = substr( $code, $index + 1 );
    $carecenter = \Data\Carecenter\get( $id );
    if( $carecenter == null ) {
        error_log("[synchro] parseCode: No care center with id='$id'!");
        return null;
    }
    if( $carecenter['code'] != $code ) {
        error_log("[synchro] parseCode: unmatching codes!\n" . $carecenter['code'] . ' != ' . $code);
        return null;
    }

    return [
        'id' => $id,
        'code' => $code
    ];
}
?>
