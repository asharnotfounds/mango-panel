const { generateUUID } = require(`../../functions/genID`);
const { dbConnect } = require(`../../modules/database`)
const router = require('express').Router();
const bcrypt = require(`bcrypt`)

const { log, info, warn, error } = require(`../../functions/colors`)
const { signedIn, notSigned } = require(`../../functions/routesMiddleware`)


router.post(`/signup`, notSigned, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const db = await dbConnect();

        const usernameExists = await db.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
        if (usernameExists[0].length > 0) {
            db.end();
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        const emailExists = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);

        if (emailExists[0].length > 0) {
            db.end();
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        const uid = await generateUUID()
        await db.query('INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)', [uid, email, username, hashedPassword]);
        db.end();

        res.status(200).redirect(`/login`);
    } catch (error) {
        res.status(500).json({ response: `Error registering user\n${error}`});
    }
});

router.get(`/signup`, notSigned, async (req, res) => {

    try {
        res.render(`signup`)
    } catch (error) {
        res.status(500).json({ response: `Error registering user`});
    }
});

module.exports = router
