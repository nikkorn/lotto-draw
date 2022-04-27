import { createLotto } from "../src/index";

describe("the 'createLotto' function", () => {
    test("optionally takes an array of initial participants as an argument and will add them to the Lotto instance", () => {
        const lotto = createLotto<string>([
            ["participant", 1]
        ]);

        const result = lotto.draw();

        expect(result).toEqual("participant");
    });

    describe("optionally takes an options object and", () => {
        test("if the 'random' property has a value of a function will use the function to source random numbers for participant draws", () => {
            const randomNumbers: number[] = [];
            let randomResultsToUse: number[]  = [];

            while (randomNumbers.length < 50) {
                randomNumbers.push(Math.random());
            }

            randomResultsToUse = [...randomNumbers];

            const firstLotto = createLotto({
                random: () => randomResultsToUse.pop() as number,
                participants: [["A", 1], ["B", 1], ["C", 1], ["D", 1]]
            });

            const firstDrawResults = firstLotto.drawMultiple(50);

            randomResultsToUse = [...randomNumbers];

            const secondLotto = createLotto({
                random: () => randomResultsToUse.pop() as number,
                participants: [["A", 1], ["B", 1], ["C", 1], ["D", 1]]
            });

            const secondDrawResults = secondLotto.drawMultiple(50);

            expect(firstDrawResults.join("-")).toEqual(secondDrawResults.join("-"));
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
                test("a tickets value of zero was provided", () => {
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

        describe("has an 'add' function that", () => {
            describe("when the given participant", () => {
                test("has not already been added will add the participant with the specified ticket count", () => {
                    const lotto = createLotto().add("participant", 5);

                    const result = lotto.drawMultiple(10, { redrawable: false });
                
                    expect(result.length).toEqual(5);
                    result.forEach((winner) => expect(winner).toEqual("participant"));
                });

                test("has already been added will add to the participants ticket count", () => {
                    const lotto = createLotto([["participant", 5]]).add("participant", 5);

                    const result = lotto.drawMultiple(20, { redrawable: false });
                
                    expect(result.length).toEqual(10);
                    result.forEach((winner) => expect(winner).toEqual("participant"));
                });
            });

            test("when the tickets value is not defined will add one ticket to the participants ticket count", () => {
                const lotto = createLotto().add("participant");

                const result = lotto.drawMultiple(10, { redrawable: false });
            
                expect(result.length).toEqual(1);
                expect(result[0]).toEqual("participant");
            });
            
            test("returns the lotto instance", () => {
                const lotto = createLotto();

                const result = lotto.add("participant", 1);
            
                expect(result).toEqual(lotto);
            });
        });

        describe("has a 'remove' function that", () => {
            describe("when a tickets value", () => {
                test("is defined will remove that number of tickets from the participants ticket count", () => {
                    const lotto = createLotto().add("participant", 15);

                    lotto.remove("participant", 5);

                    const result = lotto.drawMultiple(20, { redrawable: false });
            
                    expect(result.length).toEqual(10);
                    result.forEach((winner) => expect(winner).toEqual("participant"));
                });

                test("is not defined will remove all tickets from the participants ticket count", () => {
                    const lotto = createLotto().add("participant", 15);

                    lotto.remove("participant");

                    const result = lotto.drawMultiple(20, { redrawable: false });
            
                    expect(result.length).toEqual(0);           
                });
            });
            
            test("returns the lotto instance", () => {
                const lotto = createLotto([["participant", 1]]);

                const result = lotto.remove("participant");
            
                expect(result).toEqual(lotto);
            });
        });
    });
});
