import Parser from "./parser"

describe("structure/parser", () => {
    const cases = [
        [
            "* #PATIENT-NAME Nom du patient",
            {
                "#PATIENT-NAME": {
                    id: "#PATIENT-NAME",
                    caption: "Nom du patient"
                }
            }
        ],
        [
            "* #PATIENT-GENDER Sexe (#GENDER)",
            {
                "#PATIENT-GENDER": {
                    id: "#PATIENT-GENDER",
                    caption: "Sexe",
                    type: "#GENDER"
                }
            }
        ],
        [
            "* #PATIENT-SECONDNAME Pseudo @OPTIONAL",
            {
                "#PATIENT-SECONDNAME": {
                    id: "#PATIENT-SECONDNAME",
                    caption: "Pseudo",
                    tags: ["OPTIONAL"]
                }
            }
        ]
    ];
    cases.forEach(([input, expected]) => {
        it(`should parse this single line "${input}"`, () => {
            const output = Parser.parse(input);
            expect(output).toEqual(expected);
        })
    })
});
