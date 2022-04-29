# lotto-draw

A simple tool used to pick random elements from a mutable collection of weighted participants, much like a lottery or raffle draw, written in Typescript.

## Install

```sh
$ npm install lotto-draw
```

## Example


```ts
import createLotto from "lotto-draw";

enum ItemType { Common, Uncommon, Rare, Epic }

const lotto = createLotto<ItemType>()
    .add(ItemType.Common, 40)
    .add(ItemType.Uncommon, 20)
    .add(ItemType.Rare, 5);

// The result of the following call to the 'draw' function is likely to be ItemType.Common (40/65 chance), slightly less likely to be ItemType.Uncommon (20/65 chance), and unlikely to be ItemType.Rare (5/65 chance).
let result = lotto.draw();

// We might want ItemType.Epic to be a possible result with a smaller weighting than ItemType.Rare, we can just add this to the existing lotto.
lotto.add(ItemType.Epic); // If the ticket count is omitted then a single ticket will be added.

// There is now a 1/66 chance that the result of the following call to the 'draw' function is ItemType.Epic.
result = lotto.draw();

// We can reduce the number of tickets held by a participant. The following call would result in the chances of any following calls to 'draw' returning ItemType.Uncommon being 10/66.
lotto.remove(ItemType.Uncommon, 10);

// We may want to remove a participant altogether. For example, we don't want ItemType.Common to be a potential result for any following calls to 'draw'.
lotto.remove(ItemType.Common);
```

## Usage

The `createLotto` function returns a lotto instance which, by default, contains no drawable participants.

```ts
import createLotto from "lotto-draw";

const lotto = createLotto();

// The following will return null as we have no ticket-holding participants.
const picked = lotto.draw();
```

An array of initial participants and ticket counts can be passed as an optional argument or as a lotto creation option.

```ts
import createLotto from "lotto-draw";

enum ItemType { Common, Uncommon, Rare, Epic }

// Creating a new Lotto instance, passing an array of initial participants and ticket counts.
let lotto = createLotto([
    [ItemType.Common, 40],
    [ItemType.Uncommon, 20],
    [ItemType.Rare, 5],
    [ItemType.Epic, 1]
]);

// Creating a new Lotto instance, passing an array of initial participants and ticket counts as a lotto creation option.
lotto = createLotto({
    participants: [
        [ItemType.Common, 40],
        [ItemType.Uncommon, 20],
        [ItemType.Rare, 5],
        [ItemType.Epic, 1]
    ]
});
```

The `draw` function will return a single winning participant while the `drawMultiple` function will take a number of tickets to draw and returns an array of winning participants.

```ts
import createLotto from "lotto-draw";

const lotto = createLotto().add("A").add("B").add("C");

lotto.draw(); // result: "B"

lotto.drawMultiple(5); // result: ["B", "C", "A", "B", "A"]
```

The `createLotto` function can take an options object as an argument instead of an array of initial participants, the properties of which are shown below.

| Option          |Type | Description |
| :--------------------|:- |:- |
| random        |() => number| A function returning a number between 0 (inclusive) and 1. |
| participants  |[TParticipant, number][]| The array of initial lotto participants with their ticket counts.

## Using a custom `random` function

While `lotto-draw` will use `Math.random` by default in picking participants when `draw` or `drawMultiple` is called, a custom random function can be provided as part of the `createLotto` options. This function must return a valid floating-point number between 0 (inclusive) and 1 (exclusive). This can be used to seed the random numbers used by `lotto-draw`.

## Lotto Methods

#### .add(participant, [tickets])

Adds the given participant with the number of tickets speficied. If the number of tickets is not defined then it will default to one. If the participant has already been added to the lotto then the tickets will be added to their existing ticket count.

#### .remove(participant, [tickets])

Removes the specified number of tickets for the given participant. If the number of tickets is not defined then all tickets held by that participant will be removed.

#### .draw([options])

Draws a random ticket from the overall ticket pool and returns the ticket-holding participant, or null if no tickets exist.

| Option          |Type | Description |
| :--------------------|:- |:- |
| redrawable   |boolean| Whether the ticket is redrawable. **Default: true** |

#### .drawMultiple(tickets, [options])

Draws the specified number of winning tickets and returns an array of the participants that hold the winning tickets.

| Option          |Type | Description |
| :--------------------|:- |:- |
| redrawable   |boolean| Whether the tickets are redrawable. **Default: true** |
| unique       |boolean| Whether duplicate entries of participants with multiple winning tickets should be removed from the result.  **Default: false** |