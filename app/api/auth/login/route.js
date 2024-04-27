import {
    getConnection
} from '@/src/lib/db';
import bcrypt from 'bcrypt';
import {
    setCookie
} from 'cookie';

export async function POST(req, res) {

    const data = await req.json();

    const {
        email,
        password
    } = data;

    if (!email || !password) {
        res.status = 400;
        return Response.json('Email and password are required');
    }

    const connection = await getConnection();

    try {

        const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            res.status = 400;
            return Response.json('User not found');
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status = 401;
            return Response.json('Invalid password');
        }

        const token = generateToken();
        const cookieOptions = {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };

        setCookie(res, 'authToken', token, cookieOptions);

        res.status = 200;
        return Response.json({
            userId: user.id,
            status: 'Authenticated successfully',
        });
    } catch (error) {
        console.error('Error authenticating user: ' + error.stack);
        res.status = 500;
        return Response.json('Error authenticating user');
    } finally {
        connection.end();
    }
}