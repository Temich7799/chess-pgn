import { Piece } from "./PieceType"

export type Figure = {
    id: number;
    type: Piece;
    color: 'white' | 'black'
}