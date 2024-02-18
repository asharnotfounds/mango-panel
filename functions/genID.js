const { dbConnect } = require(`../modules/database`)
const uuid = require(`uuid`)

const generateUUID = async () => {
    let id = uuid.v4();
    if (await checkIfUUIDExists(id)) {
        return generateUUID();
    }
    return id;
};

async function checkIfUUIDExists(specialUUID) {
    try {
        const connection = await dbConnect()
        const query = 'SELECT COUNT(*) AS count FROM users WHERE id = ?';
        const [results] = await connection.query(query, [specialUUID]);
        const count = results[0].count;
        return count > 0;
    } catch (error) {
        throw error;
    }
}

module.exports.generateUUID = generateUUID