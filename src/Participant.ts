/**
 * A participant that holds a number of tickets.
 */
export class Participant<TParticipant = any> {
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

    public get participant(): TParticipant {
        return this._participant;
    }

    public get tickets(): number {
        return this._tickets;
    }
}