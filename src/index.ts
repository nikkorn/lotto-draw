import { Lotto } from "./Lotto";

/**
 * A type defining a participant and ticket count.
 */
export type ParticipantEntry<TParticipant> = [TParticipant, number];

export function createLotto<TParticipant = any>(participants?: ParticipantEntry<TParticipant>[]): Lotto<TParticipant> {
    // Create the Lotto instace.
    const lotto = new Lotto();

    // If the lotto participants have been defined upfront then we will need to add them all to our lotto instance now.
    if (participants) {
        participants.forEach(([participant, tokens]) => lotto.add(participant, tokens));
    }

    // Return the Lotto instance.
    return lotto;
} 