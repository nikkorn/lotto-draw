import { createLotto } from "../src/index";

// Draw return value typed as string.
createLotto<string>().add("", 3).add("", 3).draw();

// Draw return value typed as any as no type passed with call to createLotto.
createLotto().add(4, 3).add(6, 3).add("", 3).draw();

// Draw return value typed as string as initial string participants added.
createLotto([["this", 4], ["that", 4]]).draw();

describe("the 'createLotto' function", () => {
    test("optionally takes an array of initial participants as an argument and will add them to the Lotto instance", () => {
        const lotto = createLotto<string>([
            ["participant", 1]
        ]);

        const result = lotto.draw();

        expect(result).toEqual("participant");
    });

    describe("optionally takes an options object and", () => {
        test("if the 'random' property has a value of a function", () => {
            // ...
        });

        test("if the 'participants' property has a value of an array of initial participants will add them to the Lotto instance", () => {
            const lotto = createLotto<string>({
                participants: [
                    ["participant", 1]
                ]
            });

            const result = lotto.draw();
    
            expect(result).toEqual("participant");
        });
    });

    describe("returns a Lotto instance that", () => {
        describe("has a 'drawMultiple' function that", () => {
            describe("when the 'unique' draw option is", () => {
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
    
            describe("handles cases where", () => {
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
    
        describe("has a 'draw' function that", () => {
            describe("draws and returns a winning participant when", () => {
                test("a single participants exists", () => {
                    const result = createLotto<string>().add("single", 1).draw();
            
                    expect(result).toEqual("single");
                });
            });
    
            test("handles cases where no tickets exist", () => {
                const result = createLotto<string>().drawMultiple(10);
            
                expect(result.length).toEqual(0);
            });
        });
    });
});
