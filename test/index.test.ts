import { createLotto } from "../src/index";

describe('does a', () => {
    test('thing', () => {
        // Getting wrong type here! Add should take/return its own participant type (TAddedParticipant)?
        createLotto().add(3, 3).add(9, 3).draw();

        // Draw return value typed as any as no initial participants added.
        createLotto().draw();

        // Draw return value typed as number as no number participants added.
        createLotto([[6, 4], [5, 4]]).draw();
    });
});
