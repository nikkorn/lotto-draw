import { Participant } from "./Participant";

/**
 * The options that can be supplied when drawing a single winning ticket.
 */
export type DrawOptions = {
    /** Whether the ticket is redrawable. This defaults to 'true'. */
    redrawable?: boolean;
}

/**
 * The options that can be supplied when drawing multiple winning tickets.
 */
export type DrawMultipleOptions = DrawOptions & {
    /** Whether duplicate entries of participants with multiple winning tickets should be removed from the result. */
    unique?: boolean;
}

export class Lotto<TParticipant = any> {
    /** The array of participants that are holding tickets in the lotto. */
    private _participants: Participant<TParticipant>[] = []; 

    /**
     * Adds a participant with the specified number of tickets.
     * @param participant 
     * @param tickets The number of tickets, defaults to 1.
     * @returns The Lotto instance.
     */
    public add(participant: TParticipant, tickets: number = 1): Lotto {
        // Check whether this participant has already ben added.
        const existingParticipant = this._participants.find((part) => part.participant === participant);

        if (existingParticipant) {
            // The participant has already been added to the lotto so just add to their ticket count.
            existingParticipant.tickets += tickets;
        } else {
            // The participant is not part of the lotto so we should add them.
            this._participants.push(new Participant(participant, tickets));
        }

        return this;
    }

    /**
     * Draw a winning ticket and return the participant that holds the ticket.
     * @param options The draw options.
     * @returns The participant that holds the winning ticket.
     */
    public draw(options?: DrawOptions): TParticipant | null {
        // If we have no participants then just return null.
        if (this._participants.length === 0) {
            return null;
        }

        // Find the total number of tickets held for all participants.
        const ticketCount = this._participants.reduce((count, participant) => participant.tickets + count, 0);

        // Randomly pick a winning ticket based on the total ticket count.
        const winningTicketCount = Math.floor(Math.random() * ticketCount);




        return null;
    }

    /**
     * Draws multiple winning tickets and return an array of the participants that hold the winning tickets.
     * @param options 
     * @returns 
     */
    public drawMultiple(tickets: number, options?: DrawOptions): TParticipant[] {
        // TODO Should this array contian duplicates for participants with multiple winning tickets.
        return [];
    }
}