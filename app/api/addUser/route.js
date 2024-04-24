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
        foreignuage,
        another_foreignuage,
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

            connection.query(query, [
                    name,
                    day,
                    month,
                    city,
                    language,
                    foreignuage,
                    another_foreignuage,
                    email,
                    password
                ])
                .then((result) => {

                    res.status = 200;

                    return Response.json({
                        data: {
                            userId: result.userId,
                        },
                        status: 'User added successfully'
                    });
                })
                .catch((error) => {
                    throw new Error(error);
                })
        }

    } catch (error) {
        console.error('Error adding user: ' + error.stack);
        res.status = 500;
        return Response.json('Error adding user');
    } finally {
        connection.end();
    }
}