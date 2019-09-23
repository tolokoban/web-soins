<?php
$ROLE = "";

include_once("./data.php");

function execService( $args ) {
    $result = [];
    foreach ($args as $input) {
        $result[] = parseCommand($input);
    }
    return $result;
}

function parseCommand(&$input) {
    $cmd = $input[0];

    switch ($cmd) {
        case 'echo': return (string)$input[1];
        case 'newPatients': return newPatients($input);
    }
    return "Unknown command '$cmd'!";
}

/*
Get lists of patients' IDs that have been admitted for the first time in a time range.

Input: {
  1: [Y, 1, 1],
  2: [Y, 3, 1],
  carecenter: 1
}

We will get as many patients' IDs list as we provide ranges.
Dates in ranges are given in number of SECONDS from EPOC (Jan 1st, 1970).

SELECT id FROM `soin_admission`
WHERE id IN
(SELECT A.id FROM `soin_admission` AS A, `soin_patient` AS P
WHERE P.carecenter = 1
AND P.id = A.patient
AND A.enter > 1561932000
AND A.enter < 1564610400)
GROUP BY id
HAVING COUNT(enter) = 1
 */
function newPatients( $args ) {
    $carecenterId = intval( $args['carecenter'] );
    $begin = parseDate($args[1]);
    $end = parseDate($args[2]);

    if (array_key_exists('filter', $args)) {
        $filter = $args['filter'];
        $key = strtoupper($filter[0]);

        //SELECT CONVERT(`value`, SIGNED INTEGER)
        if ($key == 'AGE') {
            $secPerYear = 365.25 * 24 * 3600;
            $maxAge = $begin - intval($filter[1] * $secPerYear);
            $minAge = $begin - intval($filter[2] * $secPerYear);
            error_log(json_encode($args));
            error_log("begin = $begin, max = $maxAge, min = $minAge");
            $stm = \Data\query(
                "SELECT A.id "
                . "FROM `soin_admission` AS A, `soin_patientField` AS F "
                . "WHERE A.id IN ("
                . "  SELECT A.id FROM `soin_admission` AS A, `soin_patient` AS P "
                . "  WHERE P.carecenter = ? "
                . "  AND P.id = A.patient "
                . "  AND A.enter > ? "
                . "  AND A.enter < ?"
                . ")"
                . "AND F.patient = A.patient "
                . "AND F.key = '#PATIENT-BIRTH' "
                . "AND CONVERT(F.value, SIGNED INTEGER) >= ? "
                . "AND CONVERT(F.value, SIGNED INTEGER) < ? "
                . "GROUP BY A.id "
                . "HAVING COUNT(enter) = 1 ",
                $carecenterId, $begin, $end,
                $minAge, $maxAge
            );
        } else {
            $val = $filter[1];
            $stm = \Data\query(
                "SELECT A.id "
                . "FROM `soin_admission` AS A, `soin_patientField` AS F "
                . "WHERE A.id IN ("
                . "  SELECT A.id FROM `soin_admission` AS A, `soin_patient` AS P "
                . "  WHERE P.carecenter = ? "
                . "  AND P.id = A.patient "
                . "  AND A.enter > ? "
                . "  AND A.enter < ?"
                . ")"
                . "AND F.patient = A.patient "
                . "AND F.key = '#PATIENT-$key' "
                . "AND F.value = '$val' "
                . "GROUP BY A.id "
                . "HAVING COUNT(enter) = 1 ",
                $carecenterId, $begin, $end
            );
        }
    } else {
        $stm = \Data\query(
            "SELECT id FROM `soin_admission` "
            . "WHERE id IN "
            . "(SELECT A.id FROM `soin_admission` AS A, `soin_patient` AS P "
            . "WHERE P.carecenter = ? "
            . "AND P.id = A.patient "
            . "AND A.enter > ? "
            . "AND A.enter < ?) "
            . "GROUP BY id "
            . "HAVING COUNT(enter) = 1 ",
            $carecenterId, $begin, $end
        );
    }

    $ids = [];
    while( null != ($row = $stm->fetch()) ) {
        $ids[] = intval($row['id']);
    }

    return count($ids);
}

/*
SELECT A.id FROM `soin_admission` AS A, `soin_patientField` AS F
WHERE A.id IN (
    SELECT A.id FROM `soin_admission` AS A, `soin_patient` AS P
    WHERE P.carecenter = 1
    AND P.id = A.patient
    AND A.enter > 1561932000
    AND A.enter < 1564610400
)
AND F.patient = A.patient
AND F.key = '#PATIENT-GENDER'
AND F.value = '#F'
GROUP BY id
HAVING COUNT(enter) = 1
 */
 function newPatientsParams( $args ) {
     $carecenterId = intval( $args['carecenter'] );
     $begin = parseDate($args[1]);
     $end = parseDate($args[2]);

     error_log("$carecenterId, $begin, $end");

     $stm = \Data\query(
         "SELECT id FROM `soin_admission` "
         . "WHERE id IN "
         . "(SELECT A.id FROM `soin_admission` AS A, `soin_patient` AS P "
         . "WHERE P.carecenter = ? "
         . "AND P.id = A.patient "
         . "AND A.enter > ? "
         . "AND A.enter < ?) "
         . "GROUP BY id "
         . "HAVING COUNT(enter) = 1 ",
         $carecenterId, $begin, $end
     );

     $ids = [];
     while( null != ($row = $stm->fetch()) ) {
         $ids[] = intval($row['id']);
     }

     return count($ids);
 }

/**
 * Array of 3 or 6 items.
 *  - Year: number or "Y" for current year.
 *  - Month: number or "M" for current month.
 *  - Day: number or "D" for current day.
 *  - Hour: number or "h" for current hour.
 *  - Minute: number or "m" for current minute.
 *  - Second: number or "s" for current second.
 */
function parseDate($arr) {
    $year = $arr[0];
    if ($year == 'Y') $year = Date('Y');
    $month = $arr[1];
    if ($month == 'M') $month = Date('M');
    $day = $arr[2];
    if ($day == 'D') $day = Date('D');

    $date = new DateTime();
    $date->setDate($year, $month, $day);

    return $date->getTimestamp();
}
?>
