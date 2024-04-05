import { Move } from "../ts/MoveType";
import { Step } from "../ts/StepType";

export default function getStepsFromMoves(moves: Array<Move>): Array<Step> {

    const steps: Array<Step> = [];

    for (const move of moves) {
        steps.push(...move);
    }

    return steps;
}