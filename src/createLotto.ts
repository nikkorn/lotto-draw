import { Lotto } from "./Lotto";

/**
 * A type defining a participant and ticket count.
 */
export type ParticipantEntry<TParticipant> = [TParticipant, number];

export type LottoCreationOptions<TParticipant> = {
    /** A function to return a pseudorandom number between 0 and 1. */
    random?: () => number; 

    /** The initial lotto participants. */
    participants?: ParticipantEntry<TParticipant>[];
};

export function createLotto<TParticipant = any>(participants?: ParticipantEntry<TParticipant>[]): Lotto<TParticipant>;

export function createLotto<TParticipant = any>(options?: LottoCreationOptions<TParticipant>): Lotto<TParticipant>;

export function createLotto<TParticipant = any>(participantsOrOptions?: ParticipantEntry<TParticipant>[] | LottoCreationOptions<TParticipant>): Lotto<TParticipant> {
    // Create the Lotto instace.
    const lotto = new Lotto<TParticipant>();

    // If no initial participants or lotto options were provided as an argument then we can just return the lotto instance now.
    if (!participantsOrOptions) {
        return lotto;
    }

    // Check whether we were provided with an array of initial participants or a lotto options object.
    if (Array.isArray(participantsOrOptions)) {
        // We are dealing with a pre-defined array of participants.
        const participants = participantsOrOptions;

        // If the lotto participants have been defined upfront then we will need to add them all to our lotto instance now.
        participants.forEach(([participant, tokens]) => lotto.add(participant, tokens));
    } else {
        // We are dealing with some lotto options.
        const { random, participants } = participantsOrOptions;

        // If the lotto participants have been defined upfront as part of the options then we will need to add them all to our lotto instance now.
        if (participants) {
            participants.forEach(([participant, tokens]) => lotto.add(participant, tokens));
        }

        if (random) {
            // TODO Handle random being set!
        }
    }

    // Return the Lotto instance.
    return lotto;
};