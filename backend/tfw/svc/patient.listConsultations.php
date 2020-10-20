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
        "SELECT C.id, C.enter, D.key, D.value "
        . "FROM " . \Data\Patient\name() . " AS P, "
        . \Data\Admission\name() . " AS A, "
        . \Data\Consultation\name() . " AS C, "
        . \Data\Data\name() . " AS D "
        . "WHERE P.id=? "
        . "AND A.patient = P.id "
        . "AND C.admission = A.id "
        . "AND D.consultation = C.id "
        . "ORDER BY C.enter DESC, D.key",
        $patientId
    );
    $result = Array();
    while ($row = $stm->fetch()) {
        $id = intVal($row['id']);
        $time = intVal($row['enter']);
        $key = $row['key'];
        $value = $row['value'];
        $result[] = [$id, $time, $key, $value];
    }

    return $result;
}
?>
