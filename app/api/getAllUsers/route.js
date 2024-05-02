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
        return Response.json({
            error: 'Birthday is required',
        }, {
            status: 400
        });
    }

    const connection = await getConnection();

    try {

        // const fieldsToExclude = ['email', 'password, note'];

        // const fieldsToSelect = UserModel.fields
        //     .filter(field => !fieldsToExclude.includes(field))
        //     .join(', ');  //TODO

        const fieldsToSelect = '*';

        const [day, month] = birthday.split('/');

        const query = city ? `SELECT ${fieldsToSelect} FROM users WHERE day = ${day} AND month = ${month} AND city REGEXP = '${city}' ORDER BY city` : `SELECT ${fieldsToSelect} FROM users WHERE day = ${day} AND month = ${month} ORDER BY city`;

        const [results, fields] = await connection.query(query);

        return Response.json(results);
    } catch (error) {
        return Response.json({
            error: error.message,
        }, {
            status: 500
        });
    } finally {
        connection.end();
    }
}