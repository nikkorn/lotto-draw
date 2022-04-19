import { Lotto } from "./Lotto";

export default function createLotto<TParticipant = any>(): Lotto<TParticipant> {
    const lotto = new Lotto();

    return lotto;
} 