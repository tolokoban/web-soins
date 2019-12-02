# List all positive VIH

```sql
SELECT P.`key`, F.`key`, F.`value`
FROM `soin_data` as D,
`soin_consultation` as C,
`soin_admission` as A,
`soin_patient` as P,
`soin_patientField` as F
WHERE D.`consultation`=C.`id`
AND C.`admission`=A.`id`
AND A.`patient`=P.`id`
AND F.`patient`=P.`id`
AND D.`key`='#VIH'
AND D.`value`='#POSITIVE'
AND F.`key`<>'id'
ORDER BY P.`key`, F.`key`
```
