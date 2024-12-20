import pool from "../config/dbMySql.config.js";

class ContactRepository {
    static async getContacts(user_id, page, per_page) {
        const query = `SELECT username, email, u.id as id
        FROM Contacts as c INNER JOIN Users as u ON c.user_id_contact = u.id 
        WHERE c.user_id = ? AND c.active = 1 AND u.active = 1 ORDER BY username LIMIT ? OFFSET ?`
        
        const [rows] = await pool.execute(query, [user_id, per_page, page * per_page])

        return rows
    }

    static async getContact(user_id, contact_id) {
        const query = `SELECT username, email
        FROM Contacts as c INNER JOIN Users as u ON c.user_id_contact = u.id 
        WHERE c.user_id = ? AND c.active = 1 AND u.active = 1  AND c.user_id_contact = ?`
        
        const [rows] = await pool.execute(query, [user_id, contact_id])

        if(rows.length > 0){
            return rows[0]
        }
        else{
            return undefined
        }
    }

    static async postContacts(contact) {
        const {
            user_id, 
            user_id_contact
        } = contact

        const query = `INSERT INTO Contacts (user_id, user_id_contact) VALUES (?, ?)`

        const [result] = await pool.execute(query, [user_id, user_id_contact])
        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log('holi') //TODO check
        }
    }
}

export default ContactRepository
