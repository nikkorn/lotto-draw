import { createLotto } from "../src/index";

describe('does a', () => {
    test('thing', () => {
        // Draw return value typed as string.
        createLotto<string>().add("", 3).add("", 3).draw();

        // Draw return value typed as any as no type passed with call to createLotto.
        createLotto().add(4, 3).add(6, 3).add("", 3).draw();

        // Draw return value typed as string as initial string participants added.
        createLotto([["this", 4], ["that", 4]]).draw();
    });
});
