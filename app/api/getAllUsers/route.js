import {
    getConnection
} from '../../../src/lib/db';

export async function GET(req, res) {

    const searchParams = req.nextUrl.searchParams;

    const birthday = searchParams.get('birthday');
    const city = searchParams.get('city');

    if (!birthday) {
        res.status = 400;
        return Response.json({
            error: 'Birthday is required',
        });
    }

    const connection = await getConnection();

    try {
        const query = city ? `SELECT * FROM users WHERE birthday = '${birthday}' AND city = '${city}'` : `SELECT * FROM users WHERE birthday = '${birthday}'`;
        const [results, fields] = await connection.query(query);
        return Response.json(results);
    } catch (error) {
        res.status = 500;
        return Response.json({
            error: error.message,
        });
    } finally {
        connection.end();
    }
}