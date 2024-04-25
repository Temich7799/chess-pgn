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
        foreign,
        another_foreign,
        email,
        note,
        password
    } = req.body;

    if (!name && !day && !month && !city && !language && !foreign && !another_foreign && !email && !note && !password) {
        res.status = 400;
        return Response.json('All fields are empty');
    }

    if (!day || !month) {
        res.status = 400;
        return Response.json('Day and month are required');
    }

    const connection = await getConnection();

    try {

        const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length > 0) {
            res.status = 400;
            return Response.json('User already exists');
        } else {

            const query = 'INSERT INTO users (name, day, month, city, `language`, `foreign`, another_foreign, email, note, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            return connection.query(query, [
                    name,
                    day,
                    month,
                    city,
                    language,
                    foreign,
                    another_foreign,
                    email,
                    note,
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
                    res.status = 500;
                    console.error(error);
                    return Response.json('Error adding user');
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