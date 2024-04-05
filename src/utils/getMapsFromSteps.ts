import { FieldSquare } from "../ts/FieldSquareType";
import { PositionsMap } from "../ts/PositionsMapType";
import { Step } from "../ts/StepType";

export default function getMapsFromSteps(initialMap: PositionsMap, steps: Array<Step>): Array<PositionsMap> {

    // return steps.map(([movedFigure, figureNewPosition, makesHit]: Step, stepIndex: number) => {

    //     const isWhiteTurn = stepIndex % 2;

    //     return initialMap.map((row: Array<FieldSquare>) => row.map((figurePosition: FieldSquare) => {

    //         const { figure, type, position: figureOldPosition } = figurePosition;

    //         if ((isWhiteTurn && type === 'white') || (isWhiteTurn && type === 'black')) {

    //             return {
    //                 figure: !figure ? movedFigure : (figure === movedFigure) && null,
    //                 type,
    //                 position: figureNewPosition
    //             }
    //         }
    //         else return { figure, type, position: figureOldPosition }
    //     })
    //     ) as PositionsMap
    // });

    return []
}
