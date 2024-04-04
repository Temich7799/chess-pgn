import { Figure } from "./FigureType"
import { Position } from "./PositionType";

export type FigurePosition = {
    figure?: Figure;
    position: Position;
    type?: "white" | "black";
}