import {
    getConnection
} from '../../../src/lib/db';

export async function POST(req, res) {
    const {
        userId,
        friendId
    } = req.body;

    const connection = await getConnection();

    try {

        const userExists = await connection.query('SELECT * FROM users WHERE user_id = ?', [userId]);
        const friendExists = await connection.query('SELECT * FROM users WHERE user_id = ?', [friendId]);

        if (userExists.length === 0 || friendExists.length === 0) {
            res.status(400).json('One or both users do not exist');
            return;
        }

        await connection.query('INSERT INTO friendships (user_id, friend_id) VALUES (?, ?)', [userId, friendId]);

        res.status(200).json('Friend added successfully');
    } catch (error) {
        console.error('Error adding friend: ' + error.stack);
        res.status(500).json('Error adding friend');
    } finally {
        connection.end();
    }
}