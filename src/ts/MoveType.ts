import { Figure } from "./FigureType";
import { Position } from "./PositionType";

type Step = [Figure, Position, 'x' | undefined | null];

export type Move = [Step, Step];