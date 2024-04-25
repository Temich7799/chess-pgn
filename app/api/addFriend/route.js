import {
    getConnection
} from '../../../src/lib/db';

export async function POST(req, res) {

    const {
        userId,
        friendId
    } = req.body;

    if (userId === friendId) {
        res.status(400).json('User and friend cannot be the same');
        return;
    }

    const connection = await getConnection();

    try {

        const userExists = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
        const friendExists = await connection.query('SELECT * FROM users WHERE id = ?', [friendId]);

        if (userExists.length === 0 || friendExists.length === 0) {
            res.status = 400;
            return Response.json('One or both users do not exist');
        }

        await connection.query('INSERT INTO friendships (id, friend_id) VALUES (?, ?)', [userId, friendId]);

        res.status = 200;
        Response.json('Friend added successfully');
    } catch (error) {
        console.error('Error adding friend: ' + error.stack);
        res.status = 500;
        Response.json('Error adding friend');
    } finally {
        connection.end();
    }
}