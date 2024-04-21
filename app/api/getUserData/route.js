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
        const query = city ? 'SELECT * FROM users WHERE birthday = ? AND city = ?' : 'SELECT * FROM users WHERE birthday = ?';
        const results = await connection.query(query, [birthday, city]);
        if (results.length > 0) {
            return Response.json(results);
        } else {
            return Response.json({
                message: 'No user found with the specified criteria',
            });
        }
    } catch (error) {
        res.status = 500;
        return Response.json({
            error: error.message,
        });
    } finally {
        connection.end();
    }
}