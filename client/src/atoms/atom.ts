import { atom } from "jotai";
interface Token {
    token: string
}
export const tokenAtom = atom<Token>({
    token: 'null'
})

export const authAtom = atom(false);
export const userAtom = atom(null);

