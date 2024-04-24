import {
    UserModel
} from '@/lib/Models/UserModel';
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

        const fieldsToExclude = ['email', 'password, note'];

        const fieldsToSelect = Object.keys(UserModel.fields)
            .filter(field => !fieldsToExclude.includes(field))
            .join(', ');

        const query = city ? `SELECT ${fieldsToSelect} FROM users WHERE birthday = '${birthday}' AND city = '${city}'` : `SELECT ${fieldsToSelect} FROM users WHERE birthday = '${birthday}'`;

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