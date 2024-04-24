import {
    getConnection
} from '../../../src/lib/db';

export async function GET(req, res) {

    const {
        userId
    } = req.query;

    const connection = await getConnection();

    try {

        const query = `
            SELECT p.*
            FROM persons p
            INNER JOIN friendships f ON p.user_id = f.friend_id
            WHERE f.user_id = ?
        `;

        const friends = await connection.query(query, [userId]);

        res.status = 200;
        Response.json(friends);
    } catch (error) {
        console.error('Error fetching friends: ' + error.stack);
        res.status = 500;
        Response.json('Error fetching friends');
    } finally {
        connection.end();
    }
}