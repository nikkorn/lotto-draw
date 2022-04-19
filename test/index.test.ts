import createLotto from "../src/index";

describe('does a', () => {
    test('thing', () => {
        expect(createLotto().draw()).toBe(15);
    });
});
