import { Figure } from '../ts/FigureType';
import { PositionsMap } from '../ts/PositionsMapType';
import getAllPositions from './getAllPositions';

export default function getInitialMap(): PositionsMap {

    const positions = getAllPositions();
    const figuresBackRow: Array<Figure> = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    const figuresFrontRow: Array<Figure> = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];

    const initialMap: PositionsMap = [
        [], [], [], [], [], [], [], []
    ];

    for (let i = 0; i < 8; i++) {
        initialMap[0].push({
            figure: figuresBackRow[i],
            position: positions.pop()!,
            type: 'white'
        });
    }

    for (let i = 0; i < 8; i++) {
        initialMap[1].push({
            figure: figuresFrontRow[i],
            position: positions.pop()!,
            type: 'white'
        });
    }

    for (let i = 2; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            initialMap[i].push({
                position: positions.pop()!,
            });
        }
    }

    for (let i = 0; i < 8; i++) {
        initialMap[6].push({
            figure: 'P',
            position: positions.pop()!,
            type: 'black'
        });
    }

    for (let i = 0; i < 8; i++) {
        initialMap[7].push({
            figure: figuresBackRow[i],
            position: positions.pop()!,
            type: 'black'
        });
    }

    return initialMap;
}
