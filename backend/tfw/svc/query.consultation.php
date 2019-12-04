<?php
$ROLE = "";

include_once("./data.php");

/**
 * Return an array of consultations' ids.
 *
 * type IFilter = IFilterGroup | IFilterTest
 * type IFilterGroup [
 *   "OR" | "AND",
 *   ...IFilter[]
 * ]
 * type IFilterText [
 *   "=" | "!=",
 *   string,            // Key
 *   string | string[]  // Value
 * ]
 *
 * Input:
 * {
 *   minDate: number, // milliseconds from EPOC.
 *   maxDate: number, // milliseconds from EPOC.
 *   filter: IFilter
 * }
 *
 * Errors:
 *   -1: Missing 'minDate'.
 *   -2: Missing 'maxDate'.
 *   -3: Missing 'filter'.
 */
function execService($args)
{
    if (!array_key_exists('minDate', $args)) {
        return -1;
    }
    if (!array_key_exists('maxDate', $args)) {
        return -2;
    }
    if (!array_key_exists('filter', $args)) {
        return -3;
    }
    $minDate = intVal($args["minDate"] / 1000);
    $maxDate = intVal($args["maxDate"] / 1000);
    $filter = $args["filter"];

    return query($filter, $minDate, $maxDate)->toArray();
}


function query($filter, $minDate, $maxDate) {
    $command = strtoupper($filter[0]);
    $tail = array_slice($filter, 1);
    switch ($command) {
        case 'AND': return queryAnd($tail, $minDate, $maxDate);
        case 'OR': return queryOr($tail, $minDate, $maxDate);
        case '=': return queryEqual($tail, $minDate, $maxDate);
        case '!=': return queryNotEqual($tail, $minDate, $maxDate);
    }
    error_log("Unknown filter: " . json_encode($filter));
    return new Set([]);
}


function queryAnd($filters, $minDate, $maxDate) {
    $set = new Set([]);
    foreach ($filters as $filter) {
        $set->intersect(query($filter, $minDate, $maxDate));
    }
    return $set;
}


function queryOr($filters, $minDate, $maxDate) {
    $set = new Set([]);
    foreach ($filters as $filter) {
        $set->union(query($filter, $minDate, $maxDate));
    }
    return $set;
}


function queryEqual($tail, $minDate, $maxDate) {
    $set = new Set([]);
    $key = $tail[0];
    $value = $tail[1];

    if (is_array($value)) {
        $stm = \Data\query(
            "SELECT consultation "
            . "FROM " . \Data\Data\name() . " as D, " . \Data\Consultation\name() . " as C "
            . "WHERE consultation=C.id "
            . "AND `enter` > ? "
            . "AND `enter` < ? "
            . "AND `key`=? "
            . "AND `value` IN " . makeAlternatives($value),
            $minDate, $maxDate, $key);
    }
    else {
        $stm = \Data\query(
            "SELECT consultation "
            . "FROM " . \Data\Data\name() . " as D, " . \Data\Consultation\name() . " as C "
            . "WHERE consultation=C.id "
            . "AND `enter` > ? "
            . "AND `enter` < ? "
            . "AND `key`=? "
            . "AND `value`=?",
            $minDate, $maxDate, $key, $value);
    }

    while ($row = $stm->fetch()) {
        $id = intVal($row[0]);
        $set->add($id);
    }

    return $set;
}


function queryNotEqual($tail, $minDate, $maxDate) {
    $set = new Set([]);
    $key = $tail[0];
    $value = $tail[1];

    if (is_array($value)) {
        $stm = \Data\query(
            "SELECT consultation "
            . "FROM " . \Data\Data\name() . " as D, " . \Data\Consultation\name() . " as C "
            . "WHERE consultation=C.id "
            . "AND `enter` > ? "
            . "AND `enter` < ? "
            . "AND `key`=? "
            . "AND `value` NOT IN " . makeAlternatives($value),
            $minDate, $maxDate, $key);
    }
    else {
        $stm = \Data\query(
            "SELECT consultation "
            . "FROM " . \Data\Data\name() . " as D, " . \Data\Consultation\name() . " as C "
            . "WHERE consultation=C.id "
            . "AND `enter` > ? "
            . "AND `enter` < ? "
            . "AND `key`=? "
            . "AND `value`<>?",
            $minDate, $maxDate, $key, $value);
    }

    while ($row = $stm->fetch()) {
        $id = intVal($row[0]);
        $set->add($id);
    }

    return $set;
}


function makeAlternatives($items) {
    return '(' . implode(',', $items) . ')';
}

class Set {
    private $array = [];

    public function __construct($initialArray) {
        $this->array = array_unique(
            $initialArray,
            SORT_NUMERIC
        );
    }

    public function add($number) {
        $this->array[] = $number;
    }

    public function intersect($set) {
        $this->array = array_intersect($this->array, $set->array);
    }

    public function union($set) {
        $this->array = array_unique(
            array_merge($this->array, $set->array),
            SORT_NUMERIC
        );
    }

    public function toArray() {
        return array_slice($this->array, 0);
    }
}
?>
