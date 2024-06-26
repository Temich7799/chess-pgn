import { Piece } from "../ts/PieceType";
import { Move } from "../ts/MoveType";
import { Position } from "../ts/PositionType";
import { Step } from "../ts/StepType";
import getAllFigures from "./getAllFigures";

export default function parsePGN(pgn: string): Array<Move> {

    const moves: Array<Move> = [];

    const moveStrings = pgn.split(/\d+\./).filter(Boolean);

    for (const moveString of moveStrings) {
        const steps = moveString.trim().split(/\s+/);
        const whiteStep: Step = parseStep(steps[0]);
        const blackStep: Step = parseStep(steps[1]);
        moves.push([whiteStep, blackStep]);
    }

    return moves;
}

function parseStep(stepString: string): Step {

    const makesHit = stepString.length === 4;
    const isPawn = (stepString.length === 2) || (makesHit && getAllFigures().indexOf(stepString[0] as Piece) === -1);

    const figureType = isPawn ? 'P' : stepString[0] as Piece;
    const figureNewPosition = stepString.slice(stepString.length - 2, 4) as Position;

    return [figureType, figureNewPosition, makesHit];

}
