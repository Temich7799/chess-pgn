import { FigurePosition } from "../ts/FigurePositionType";
import { PositionsMap } from "../ts/PositionsMapType";
import { Step } from "../ts/StepType";

export default function getMapsFromSteps(initialMap: PositionsMap, steps: Array<Step>): Array<PositionsMap> {

    // return steps.map(([movedFigure, figureNewPosition, makesHit]: Step, stepIndex: number) => {

    //     const isWhiteTurn = stepIndex % 2;

    //     return initialMap.map((row: Array<FigurePosition>) => row.map((figurePosition: FigurePosition) => {

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
    // }); todo

    return [initialMap];
}
