<?php
$ROLE = "";

include_once("./data.php");


function execService( $args ) {
    $orgaId = intval( $args );
    $structureIds = \Data\Organization\getStructures( $orgaId );
    if( count( $structureIds ) < 1 ) return [];

    $stm = \Data\query("SELECT id, name, exams, vaccins, patient, forms, types FROM" . \Data\Structure\name()
                     . "WHERE id IN (" . implode(',',$structureIds) . ")");
    $structures = [];
    while( null != ($row = $stm->fetch()) ) {
        $structures[] = [
            'id' => intval($row['id']),
            'name' => $row['name'],
            'exams' => $row['exams'],
            'vaccins' => $row['vaccins'],
            'patient' => $row['patient'],
            'forms' => $row['forms'],
            'types' => $row['types']
        ];
    }
    return $structures;
}
?>
