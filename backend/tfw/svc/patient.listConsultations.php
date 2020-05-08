<?php
$ROLE = "USER";

include_once("./data.php");

/**
 * Input:
 * PatientID
 *
 * Output:
 * {
 *   id: number[],
 *   time: number[]
 * }
 */
function execService($args)
{
    $patientId = intVal($args);

    // Retrieving consultation of a patient, recent first.
    $stm = \Data\query(
        "SELECT C.id, C.enter "
        . "FROM " . \Data\Admission\name() . " AS A, "
        . \Data\Consultation\name() . " AS C "
        . "WHERE A.patient = ? "
        . "AND A.id = C.admission "
        . "ORDER BY C.enter DESC",
        $patientId
    );
    $result = Array(
        "id" => Array(),
        "time" => Array()
    );
    while ($row = $stm->fetch()) {
        $id = intVal($row['id']);
        $time = intVal($row['enter']);
        $result["id"][] = $id;
        $result["time"][] = $time;
    }

    return $result;
}
?>
