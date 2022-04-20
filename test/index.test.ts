import createLotto from "../src/index";

describe('does a', () => {
    test('thing', () => {
        createLotto<number>().add(3, 3).draw()
        expect(createLotto().draw()).toBe(15);
    });
});
