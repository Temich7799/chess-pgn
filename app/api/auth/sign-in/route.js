import {
    getConnection
} from '../../../../src/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req, res) {
    const data = await req.json();
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
    } = data;

    if (!name || !day || !month || !city || !language || !foreign || !another_foreign || !email || !note || !password) {
        res.status = 400;
        return Response.json('All fields are required');
    }

    const connection = await getConnection();

    try {
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            res.status = 400;
            return Response.json('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const query = 'INSERT INTO users (name, day, month, city, `language`, `foreign`, another_foreign, email, note, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await connection.query(query, [name, day, month, city, language, foreign, another_foreign, email, note, hashedPassword]);

        res.status = 200;
        return Response.json({
            data: {
                userId: result.insertId,
            },
            status: 'User added successfully'
        });
    } catch (error) {
        console.error('Error adding user: ' + error.stack);
        res.status = 500;
        return Response.json('Error adding user');
    } finally {
        connection.end();
    }
}