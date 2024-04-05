import { FieldSquare } from "../ts/FieldSquareType";
import { PositionsMap } from "../ts/PositionsMapType";
import { Step } from "../ts/StepType";
import getAllPositions from "./getAllPositions";
import splitArrayToChunks from "./splitArrayToChunks";

export default function getMapsFromSteps(initialMap: PositionsMap, steps: Array<Step>): Array<PositionsMap> {

    const maps: Array<PositionsMap> = [];
    const squarePositions = getAllPositions();

    steps.forEach(([movedFigure, figureNewPosition, makesHit]: Step, stepIndex: number) => {

        const positionsMap = JSON.parse(JSON.stringify((maps[maps.length - 1] || initialMap).flat()));

        const isWhiteTurn = !(stepIndex % 2);
        const newPositionIndex = squarePositions.indexOf(figureNewPosition) + 1;

        positionsMap.forEach((fieldSquare: FieldSquare, squareIndex: number) => {

            const oldPositionIndex = squarePositions.indexOf(fieldSquare.position) + 1;

            if (newPositionIndex === squareIndex + 1) {
                if (positionsMap[squareIndex].figure) {
                    console.log(positionsMap[squareIndex])
                }
                else {
                    positionsMap[squareIndex].figure = { type: movedFigure, color: isWhiteTurn ? 'white' : 'black' }
                }
            }
        });

        maps.push(splitArrayToChunks(positionsMap, 8) as PositionsMap);
    });

    return maps;
}
