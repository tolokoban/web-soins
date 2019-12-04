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
 *     id: "7fgN",
 *     consultations: [
 *       [
 *         4812455023,   // enter
 *         "#POSITIVE",  // "#VIH"
 *         "#CM"         // "#GEOGRAPHICAL-ORIGIN"
 *       ],
 *       ...
 *     ]
 *   }
 * }
 */
function execService( $args ) {
    $consultationIds = $args;
    $sql = "SELECT consultation, `key`, `value` "
        . "FROM " . \Data\Data\name() . " "
        . "WHERE consultation IN (" . implode(',', $consultationIds) . ") "
        . "ORDER BY consultation, `key`";

}

?>
