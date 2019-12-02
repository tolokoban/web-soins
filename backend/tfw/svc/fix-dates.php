<?php
$ROLE = "";

include_once("./data.php");

/**
 * Most of the time, users don't record consultations the very day.
 * Instead, they wait for a quiet day and record a bunch of them in one go.
 * That's why we added a PatientField with key "#CONSULTATION-DATE", just
 * because it was impossible to select another date of the current one.
 *
 * Now, we want to remove this PatientField and fix the "consultation.enter"
 * SQL field with the value of the "#CONSULTATION-DATE" PatientField.
 *
 * The following input example means we want to change consultations dates
 * for patient "vuUQ" and carecenter with code "1-kAcGObgfMr".
 * 1) Consultation with enter date equal to 1557599983 must be changed to 1519652895.
 * 1) Consultation with enter date equal to 1491488004 must be changed to 1492618685.
 * {
 *   code: "1-kAcGObgfMr",
 *   patient: "vuUQ",
 *   dates: [
 *     [1557599983, 1519652895],
 *     [1491488004, 1492618685]
 *   ]
 * }
 *
 * # Return codes:
 *   0: Success.
 *  -1: Missing arg `patient`.
 *  -2: Missing arg `code`.
 *  -3: Missing arg `dates`.
 *  -4: Invalid code for carecenter.
 *  -5: Unknown patient key.
 *
 * If a string is returned, this is an exception message.
 */
function execService($args)
{
    if (!array_key_exists('patient', $args)) {
        return -1;
    }
    $patientKey = $args['patient'];
    if (!array_key_exists('code', $args)) {
        return -2;
    }
    $code = $args['code'];
    if (!array_key_exists('dates', $args)) {
        return -3;
    }
    $dates = $args['dates'];

    $items = parseCode($code);
    if ($items == 0) {
        return -4;
    }
    $carecenterId = $items["id"];
    $secretCode = $items["code"];

    \Data\begin();
    try {
      $patientId = getPatientId($patientKey);
      if ($patientId == -1) {
        return -5;
      }

      @TODO The rest...
    }
    catch( Exception $ex ) {
      \Data\rollback();
      return $ex->getMessage();
    }
    \Data\commit();

    return 0;
}


function getParentId($key) {
  $row = \Data\fetch("SELECT id FROM ".\Data\Patient\name()." WHERE `key`='$key'");
  if (!$row || count($row) == 0) {
    return -1;
  }

  return intVal($row[0]);
}


function parseCode($code)
{
    $index = strpos($code, '-');
    if ($index === false) {
        error_log("[synchro] parseCode: '-' not found in '$code'!");
        return null;
    }

    $id = intval(substr($code, 0, $index));
    $code = substr($code, $index + 1);
    $carecenter = \Data\Carecenter\get($id);
    if ($carecenter == null) {
        error_log("[synchro] parseCode: No care center with id='$id'!");
        return null;
    }
    if ($carecenter['code'] != $code) {
        error_log("[synchro] parseCode: unmatching codes!\n" . $carecenter['code'] . ' != ' . $code);
        return null;
    }

    return [
        'id' => $id,
        'code' => $code
    ];
}
