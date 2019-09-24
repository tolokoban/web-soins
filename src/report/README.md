# Reports

To create a dynamic report, you need to save your spreadsheet in __fods__ format (_Flat XML ODS Spreadsheet_).
Placeholders will be replaced by values from the Database.
A placeholder looks like this:
```
{{placeholder}}
```

## Counting new patients in a time range
### Simple form
`{{newPatients [Y,1,1] [Y,4,1]}}`

In its simple form, `newPatients` takes two arguments: starting date and ending date. A date is an array of three elements: year, month, day.
You can use __Y__ to specify the current year, __M__ for the month
and __D__ for current day.

### Filtered by patient params
`{{newPatients [Y,1,1] [Y,4,1] filter:[GENDER #F]}}`

In the above example, you want to count only the new patients, between January 1st and April 1st of this year, whose gender is female.
Here, we look for the param `#PATIENT-GENDER` in the database.

### Filtered by age
`{{newPatients [Y,1,1] [Y,4,1] filter:[age 18 40]}}`

__Age__ is a special case because it is a range of ages taken in the specified time period. Here we want new patients who are at least 18 years old and less than 40 years old.

## Counting new visits in a time range
### Simple form
`{{visits [Y,1,1] [Y,4,1]}}`

### Filtered by attributes
`{{visits [Y,1,1] [Y,4,1] filter:{MOTIF-CONSULTATION: #GENITAL-LEAK}}}`
