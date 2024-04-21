import {
    getConnection
} from '../../../src/lib/db';

export async function GET(req, res) {

    const searchParams = req.nextUrl.searchParams;

    const email = searchParams.get('email');

    if (!email) {
        res.status = 400;
        return Response.json({
            error: 'Email is required',
        });
    }

    const connection = await getConnection();

    try {

        const results = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length > 0) {
            return Response.json({
                exists: true,
            });
        } else {
            return Response.json({
                exists: false,
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