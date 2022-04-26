import { createLotto } from "../src/index";

describe('does a', () => {
    test('thing', () => {
        // Draw return value typed as string.
        createLotto<string>().add("", 3).add("", 3).draw();

        // Draw return value typed as any as no type passed with call to createLotto.
        createLotto().add(4, 3).add(6, 3).add("", 3).draw();

        // Draw return value typed as string as initial string participants added.
        createLotto([["this", 4], ["that", 4]]).draw();

        // Draw return value typed as boolean as initial boolean participants provided as part of lotto options.
        createLotto({ participants: [[true, 4], [false, 4]] }).draw();
    });

    describe("can draw multiple winners", () => {
        describe("and when the 'unique' draw option is", () => {
            test("true will return an array of unique winning participants", () => {
                const result = createLotto<string>().add("single", 1).drawMultiple(10, { unique: true });

                expect(result.length).toEqual(1);
                expect(result[0]).toEqual("single");
            });

            test("false or undefined will return an array of winning participants that inclides duplicates", () => {
                let result = createLotto<string>().add("single", 1).drawMultiple(10, { unique: false });
        
                expect(result.length).toEqual(10);
                result.forEach((winner) => expect(winner).toEqual("single"));

                result = createLotto<string>().add("single", 1).drawMultiple(10);
        
                expect(result.length).toEqual(10);
                result.forEach((winner) => expect(winner).toEqual("single"));
            });
        });

        describe("and handle cases where", () => {
            test("a tokens value of zero was provided", () => {
                const result = createLotto<string>().add("single", 1).drawMultiple(0);
        
                expect(result.length).toEqual(0);
            });

            test("no tickets exist", () => {
                const result = createLotto<string>().drawMultiple(10);
        
                expect(result.length).toEqual(0);
            });

            test("the 'redrawable' option is explicitly 'false' and the required ticket count exceeds the number of available tickets", () => {
                const result = createLotto<string>().add("first", 3).add("second", 3).drawMultiple(100, { redrawable: false });
        
                expect(result.length).toEqual(6);
            });
        });
    });

    describe("handles a single draw when", () => {
        test("no participants exist", () => {
            const result = createLotto<string>().draw();
    
            expect(result).toEqual(null);
        });

        test("a single participants exists", () => {
            const result = createLotto<string>().add("single", 1).draw();
    
            expect(result).toEqual("single");
        });
    });
});
