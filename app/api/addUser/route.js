import {
    getConnection
} from '../../../src/lib/db';

export async function POST(req, res) {

    const {
        name,
        day,
        month,
        city,
        language,
        foreign_language,
        another_foreign_language,
        email,
        password
    } = req.body;

    const connection = await getConnection();

    try {
        const results = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            res.status = 400;
            return Response.json('User already exists');
        } else {

            const query = 'INSERT INTO users (name, day, month, city, language, foreign, another_foreign, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

            await connection.query(query, [
                name,
                day,
                month,
                city,
                language,
                foreign_language,
                another_foreign_language,
                email,
                password
            ]);

            res.status = 200;

            return Response.json('User added successfully');
        }
    } catch (error) {
        console.error('Error adding user: ' + error.stack);
        res.status = 500;
        return Response.json('Error adding user');
    } finally {
        connection.end();
    }
}