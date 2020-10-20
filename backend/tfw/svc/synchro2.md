# synchro

## `{ cmd: "status", code: string }`

Ask the server to return the list of patients and consultations in a summarized form.

This service returns a string in case of success. Each line (in UNIX format) represents a patient and looks like this:

```html
<patient-key>:<consultation-uuid>,<consultation-version>;<consultation-uuid>,<consultation-version>,...
```
