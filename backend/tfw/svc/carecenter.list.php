<?php
$ROLE = "";

include_once("./data.php");


function execService( $args ) {
    error_log("[carecenter.list] args: " . json_encode($args));
    $orgaId = intval( $args );
    $carecenterIds = \Data\Organization\getCarecenters( $orgaId );
    if( count( $carecenterIds ) < 1 ) return [];

    $stm = \Data\query("SELECT id, `name`, `code`, `structure` FROM" . \Data\Carecenter\name()
                     . "WHERE id IN (" . implode(',',$carecenterIds) . ")");
    $carecenters = [];
    while( null != ($row = $stm->fetch()) ) {
        $id = intval($row['id']);
        $carecenters[] = [
            'id' => $id,
            'name' => $row['name'],
            'code' => $row['code'],
            'patientsCount' => getPatientsCount($id),
            'consultationsCount' => getConsultationsCount($id),
            'structure' => intval($row['structure'])
        ];
    }
    error_log("[carecenter.list] carecenters: " . json_encode($carecenters));
    return $carecenters;
}

function getPatientsCount( $carecenterId ) {
    return count(\Data\Carecenter\getPatients($carecenterId));
}

function getConsultationsCount( $carecenterId ) {
    $count = 0;
    $patientIds = \Data\Carecenter\getPatients($carecenterId);
    foreach( $patientIds as $patientId ) {
        $admissionIds = \Data\Patient\getAdmissions($patientId);
        foreach( $admissionIds as $admissionId ) {
            $count += count(\Data\Admission\getConsultations($admissionId));
        }
    }
    return $count;
}
?>
