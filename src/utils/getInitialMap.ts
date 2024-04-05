import { FieldSquare } from '../ts/FieldSquareType';
import { Piece } from '../ts/PieceType';
import { PositionsMap } from '../ts/PositionsMapType';
import { Position } from '../ts/PositionType';
import getAllPositions from './getAllPositions';
import splitArrayToChunks from './splitArrayToChunks';

export default function getInitialMap(): PositionsMap {

    const fieldSquares: Array<Position> = getAllPositions();
    const figuresBackRow: Array<Piece> = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    const figuresFrontRow: Array<Piece> = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];

    const rows: Array<Array<Position>> = splitArrayToChunks(fieldSquares, 8);

    return rows.map((row, rowIndex: number) =>
        row.map((squareName: Position, squareIndex: number) =>
            (rowIndex === 0 || rowIndex === rows.length - 1)
                ? ({
                    position: squareName,
                    figure: {
                        id: fieldSquares.indexOf(squareName) + 1,
                        type: figuresBackRow[squareIndex],
                        color: rowIndex === 0 ? 'black' : 'white',
                    }
                })
                : (rowIndex === 1 || rowIndex === rows.length - 2)
                    ? ({
                        position: squareName,
                        figure: {
                            id: fieldSquares.indexOf(squareName) + 1,
                            type: figuresFrontRow[squareIndex],
                            color: rowIndex === 1 ? 'black' : 'white',
                        }
                    })
                    : ({
                        position: squareName,
                    })
        )
    ) as PositionsMap;
}
