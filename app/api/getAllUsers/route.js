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

        // const fieldsToExclude = ['email', 'password, note'];

        // const fieldsToSelect = UserModel.fields
        //     .filter(field => !fieldsToExclude.includes(field))
        //     .join(', ');  //TODO

        const fieldsToSelect = '*';

        const [day, month] = birthday.split('/');

        const query = city ? `SELECT ${fieldsToSelect} FROM users WHERE day = ${day} AND month = ${month} AND city = '${city}'` : `SELECT ${fieldsToSelect} FROM users WHERE day = ${day} AND month = ${month}`;

        const [results, fields] = await connection.query(query);
        console.log(results)
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