<?php
$ROLE = "";

include_once("./data.php");

/*
Get lists of patients' IDs that have been admitted for the first time in a time range.

Input: {
  carecenter: 1,
  ranges: [ [1561932000, 15646104000], [...], ... ]
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
function execService( $args ) {
    $carecenterId = intval( $args['carecenter'] );
    $ranges = $args['ranges']

    $result = [];

    foreach ($ranges as $range) {
        $begin = intval($range[0])
        $end = intval($range[1])

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

        $result[] = $ids;
    }

    return $result;
}
?>
