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
        $output["index"]["records"][$patient["key"]] = [
            "id" => $patient["key"]
        ];
        $fieldIds = \Data\Patient\getFields($patientId);
        foreach ($fieldIds as $fieldId) {
            $field = Data\PatientField\get($fieldId);
            $output["index"]["records"][$patient[$key]][$field["key"]] =
                $field["value"];
        }
        $output["list"][$patient["key"]] = [
            "id" => $patient["key"],
            "created" => intVal($patient["created"]),
            "edited" => intVal($patient["edited"]),
            "data" => getData($patientId),
            "admission" => getAdmissions($patientId),
            "vaccins" => getVaccins($patientId),
            "exams" => [],
            "picture" => null,
            "attachements" => []
        ];
    }

    return $output;
}

function getData($patientId) {
    return [];
}

function getAdmissions($patientId) {
    return [];
}

function getVaccins($patientId) {
    return [];
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
