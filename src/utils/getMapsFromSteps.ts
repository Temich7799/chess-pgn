import { Console } from "console";
import { FieldSquare } from "../ts/FieldSquareType";
import { Figure } from "../ts/FigureType";
import { Piece } from "../ts/PieceType";
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

        const isPawnMoved = movedFigure === 'P';
        const isBishopMoved = movedFigure === 'B';
        const isKnightMoved = movedFigure === 'N';

        const isPawnMakeHit = movedFigure === 'P' && makesHit;

        const newPositionIndex = squarePositions.indexOf(figureNewPosition) + 1;

        positionsMap.forEach((fieldSquare: FieldSquare, squareIndex: number) => {

            const findOldFigurePositionIndex = (movedFigure: Piece): number | void => {

                const { figure = {} as Figure, position } = positionsMap[squareIndex] as FieldSquare;
                const { type: figureType, color } = figure;

                const isNewPositionWhiteSquare = squareIndex % 2;
                const isOldPositionWhiteSquare = (squarePositions.indexOf(position) % 2);

                const getPawnPositionIndex = () => {

                    const isFirstStepForWhitePawn = newPositionIndex > 31 && newPositionIndex < 47;
                    const isFirstStepForBlackPawn = newPositionIndex > 15 && newPositionIndex < 32;

                    const isFirstStep = isWhiteTurn ? isFirstStepForWhitePawn : isFirstStepForBlackPawn;

                    let shift = isFirstStep ? 16 : 8;

                    if (!isWhiteTurn) {
                        shift *= -1;
                    }

                    let oldPositionIndex = newPositionIndex + shift - 1;

                    if (isFirstStep) {

                        if (isFirstStepForWhitePawn && oldPositionIndex > 55) {
                            oldPositionIndex -= 8;
                        }

                        if (isFirstStepForBlackPawn && oldPositionIndex < 8) {
                            oldPositionIndex += 8;
                        }
                    }

                    return oldPositionIndex;
                }

                const detectBishop = isWhiteTurn ? (isNewPositionWhiteSquare && isOldPositionWhiteSquare) : !(isNewPositionWhiteSquare && isOldPositionWhiteSquare);
                const detectKnight = !detectBishop;

                const getBishopPositionIndex = () => {
                    if (detectBishop) return squareIndex;
                }

                const getKnightPositionIndex = () => {
                    if (detectKnight) return squareIndex;
                }

                return isPawnMoved
                    ? getPawnPositionIndex()
                    : isBishopMoved
                        ? getBishopPositionIndex()
                        : isKnightMoved
                            ? getKnightPositionIndex()
                            : squareIndex;
            }

            const removeFigureFromPositionsMap = (index: number) => {

                const { figure = {} as Figure, position } = positionsMap[index] as FieldSquare;
                const { type, color } = figure;

                const isOldFigureMatched = type === movedFigure && color === (isWhiteTurn ? 'white' : 'black');

                if (isOldFigureMatched) {
                    positionsMap[index].figure = undefined;
                }
                else return false;
            }

            const oldFigurePositionIndex = findOldFigurePositionIndex(movedFigure);

            const removeOldPawnAfterHit = (index: number) => removeFigureFromPositionsMap(index + 1) || removeFigureFromPositionsMap(index - 1);

            oldFigurePositionIndex && (isPawnMakeHit ? removeOldPawnAfterHit(oldFigurePositionIndex) : removeFigureFromPositionsMap(oldFigurePositionIndex));

            //adding a new figure
            if (newPositionIndex === squareIndex + 1) {
                positionsMap[squareIndex].figure = { type: movedFigure, color: isWhiteTurn ? 'white' : 'black' }
            }
        });

        maps.push(splitArrayToChunks(positionsMap, 8) as PositionsMap);
    });

    return maps;
}
