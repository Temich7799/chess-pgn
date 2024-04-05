export default function splitArrayToChunks(array: Array<any>, chunkSize: number) {

    const result = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    return result;
}