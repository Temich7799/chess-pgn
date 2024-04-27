export async function GET(req, res) {

    const {
        cookies
    } = req;

    if (!cookies.authToken) {
        res.status = 401;
        return Response.json('User not authenticated');
    }

    res.status = 200;

    return Response.json('User authenticated');
}