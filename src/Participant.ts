/**
 * A participant that holds a number of tickets.
 */
export class Participant<TParticipant> {
    /** The actual participant. */
    private _participant: TParticipant;

    /** The number of tickets held by the participant. */
    private _tickets: number;

    /**
     * Creates an instance of the Participant class.
     * @param participant The actual participant.
     * @param tickets The number of tickets held by the participant.
     */
    public constructor(participant: TParticipant, tickets: number = 1) {
        this._participant = participant;
        this._tickets = tickets;
    }

    /** Gets the actual participant. */
    public get participant(): TParticipant {
        return this._participant;
    }

    /** Gets or sets the number of tickets held by the participant. */
    public get tickets(): number {
        return this._tickets;
    }
    public set tickets(value: number) {
        this._tickets = value;
    }
}
