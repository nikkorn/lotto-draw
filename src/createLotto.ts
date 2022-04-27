import { Lotto } from "./Lotto";

/**
 * A type defining a participant and ticket count.
 */
export type ParticipantEntry<TParticipant> = [TParticipant, number];

/**
 * The options relating to the creation of a Lotto instance.
 */
export type LottoCreationOptions<TParticipant> = {
    /** A function to return a pseudorandom number between 0 and 1. */
    random?: () => number;

    /** The initial lotto participants. */
    participants?: ParticipantEntry<TParticipant>[];
};

/**
 * A function that creates and returns a Lotto instance.
 * @param participantsOrOptions An array of initial participants or options relating to the creation of a Lotto instance.
 * @returns A new Lotto instance.
 */
export function createLotto<TParticipant = any>(
    participantsOrOptions?: ParticipantEntry<TParticipant>[] | LottoCreationOptions<TParticipant>,
): Lotto<TParticipant> {
    // If no initial participants or lotto options were provided as an argument then we can just return a new lotto instance now.
    if (!participantsOrOptions) {
        return new Lotto<TParticipant>();
    }

    // Check whether we were provided with an array of initial participants or a lotto options object.
    if (Array.isArray(participantsOrOptions)) {
        // We are dealing with a pre-defined array of participants.
        const participants = participantsOrOptions;

        const lotto = new Lotto<TParticipant>();

        // If the lotto participants have been defined upfront then we will need to add them all to our lotto instance now.
        participants.forEach(([participant, tokens]) => lotto.add(participant, tokens));

        // Return the Lotto instance.
        return lotto;
    } else {
        // We are dealing with some lotto options.
        const { random, participants } = participantsOrOptions;

        // Create a Lotto instance passing the custom RNG function to use in place of Math.random() (which could be undefined).
        const lotto = new Lotto<TParticipant>(random);

        // If the lotto participants have been defined upfront as part of the options then we will need to add them all to our lotto instance now.
        if (participants) {
            participants.forEach(([participant, tokens]) => lotto.add(participant, tokens));
        }

        // Return the Lotto instance.
        return lotto;
    }
}
