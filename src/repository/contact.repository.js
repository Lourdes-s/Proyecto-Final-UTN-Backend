import pool from "../config/dbMySql.config.js";

class ContactRepository {
    static async getContacts(user_id, page, per_page) {
        const query = `SELECT username, email, u.id as id
        FROM Contacts as c INNER JOIN Users as u ON c.user_id_contact = u.id 
        WHERE c.user_id = ? AND c.active = 1 AND u.active = 1 ORDER BY username LIMIT ? OFFSET ?`
        
        const [rows] = await pool.query(query, [user_id, per_page, page * per_page])

        return rows
    }

    static async getContact(user_id, contact_id) {
        const query = `SELECT username, email, thumbnail, telephone, public_state, description_content, address_content
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
            console.error("Error al crear el contacto en la base de datos.")
        }
    }
    static async isContact(user_id, contact_id) {
        const query = `SELECT COUNT(*) as count
        FROM Contacts
        WHERE (user_id = ? AND user_id_contact = ?) OR (user_id = ? AND user_id_contact = ?) AND active = 1`

        const [rows] = await pool.execute(query, [user_id, contact_id, contact_id, user_id])

        return rows[0].count > 0
    }
}

export default ContactRepository
