import { Participant } from "./Participant";
import { isNaturalNumber, isNullOrUndefined } from "./Utilities";

/**
 * The options that can be supplied when drawing a single winning ticket.
 */
export type DrawOptions = {
    /** Whether the ticket is redrawable. Defaults to 'true'. */
    redrawable?: boolean;
}

/**
 * The options that can be supplied when drawing multiple winning tickets.
 */
export type DrawMultipleOptions = DrawOptions & {
    /** Whether duplicate entries of participants with multiple winning tickets should be removed from the result. Defaults to 'false'. */
    unique?: boolean;
}

export class Lotto<TParticipant = any> {
    /** The array of participants that are holding tickets in the lotto. */
    private _participants: Participant<TParticipant>[] = []; 

    /**
     * Adds a participant with the specified number of tickets, or adds to the participant ticket count if the participant already holds tickets.
     * @param participant The participant to add or to increase the ticket count for if they already hold tickets.
     * @param tickets The number of tickets, defaults to 1.
     * @returns The Lotto instance.
     */
    public add(participant: TParticipant, tickets: number = 1): Lotto<TParticipant> {
        // Check that we have a valid ticket count.
        if (!isNaturalNumber(tickets)) {
            throw new Error("tickets value must be a natural number");
        }

        // Check whether this participant has already been added.
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
     * Removes the specified number of tickets for the given participant from the draw, or all tickets if a ticket number is not defined.
     * @param participant The participant to remove tickets for.
     * @param tickets The number of tickets to remove, or undefined if all tickets are to be removed.
     * @returns The Lotto instance.
     */
    public remove(participant: TParticipant, tickets?: number): Lotto<TParticipant> {
        // Attempt to get the existing participant.
        const existingParticipant = this._participants.find((part) => part.participant === participant);

        // There is nothing to do if the specified participant isn't even part of the lotto.
        if (!existingParticipant) {
            return this;
        }

        // Check whether a tickets value was given.
        if (tickets !== undefined) {
            // Check that we have a valid ticket count.
            if (!isNaturalNumber(tickets)) {
                throw new Error("tickets value must be a natural number");
            }

            existingParticipant.tickets -= tickets;

            // If the participant no longer holds any tickets then they should be removed.
            if (existingParticipant.tickets < 1) {
                this._participants = this._participants.filter((part) => part !== existingParticipant);
            }
        } else {
            // We are removing all tickets for the participant so just remove them from the lotto.
            this._participants = this._participants.filter((part) => part !== existingParticipant);
        }

        return this;
    }

    /**
     * Draw a winning ticket and return the participant that holds the ticket.
     * @param options The draw options.
     * @returns The participant that holds the winning ticket.
     */
    public draw(options: DrawOptions = {}): TParticipant | null {
        // If we have no participants then just return null.
        if (this._participants.length === 0) {
            return null;
        }

        const redrawable = isNullOrUndefined(options.redrawable) ? true : options.redrawable;

        const pickable: TParticipant[] = [];

        this._participants.forEach(({ participant, tickets }) => {
            for (let ticketCount = 0; ticketCount < tickets; ticketCount++) {
                pickable.push(participant);
            }
        });

        // Pick a winning participant.
        const winner = pickable[Math.floor(Math.random() * pickable.length)];

        // If the ticket isn't redrawable then we should remove a ticket from the winning participants ticket count.
        if (!redrawable) {
            this.remove(winner, 1);
        }

        // Return the winning participant.
        return winner;
    }

    /**
     * Draws multiple winning tickets and return an array of the participants that hold the winning tickets.
     * @param tickets The number of winning tickets to draw.
     * @param options The draw multiple options.
     * @returns An array of the participants that hold the winning tickets.
     */
    public drawMultiple(tickets: number, options: DrawMultipleOptions = {}): TParticipant[] {
        const uniqueResults = isNullOrUndefined(options.unique) ? false : options.unique;

        // Check that we have a valid tickets count.
        if (!isNaturalNumber(tickets)) {
            throw new Error("tickets value must be a natural number");
        }

        const result: TParticipant[] = [];

        while (result.length < tickets && this._participants.length > 0) {
            result.push(this.draw(options) as TParticipant);
        }

        // If the 'unique' draw option is set then we need to remove duplicates from the result list. 
        if (uniqueResults) {
            // TODO Remove duplicates from the result list. 
        }

        return result;
    }
}