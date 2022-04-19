import { Participant } from "./Participant";

/**
 * The options that can be supplied when drawing a winning ticket.
 */
export type DrawOptions = {
    /** Whether the ticket is redrawable. This defaults to 'true'. */
    redrawable?: boolean;
}

export class Lotto<TParticipant = any> {
    /** The array of participants that are holding tickets in the lotto. */
    private _participants: Participant<TParticipant>[] = []; 

    /**
     * 
     * @param participant 
     * @param tickets 
     * @returns 
     */
    public add(participant: TParticipant, tickets: number = 1): Lotto {
        // TODO Eventually we should check whether this participant already holds tickets and simply add tickets to their count.
        this._participants.push(new Participant(participant, tickets));

        return this;
    }

    /**
     * 
     * @param options 
     * @returns 
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
     * 
     * @param options 
     * @returns 
     */
     public drawMultiple(tickets: number, options?: DrawOptions): TParticipant[] {
        return [];
    }
}