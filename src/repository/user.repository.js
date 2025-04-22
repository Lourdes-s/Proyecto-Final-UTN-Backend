import pool from "../config/dbMySql.config.js";
import UserMapper from "./user.mapper.js";

class UserRepository {
    static async getUser(userId) {
        const query = `SELECT * FROM Users WHERE id = ? AND active = 1 AND verify_email = 1`

        const [rows] = await pool.execute(query, [userId])
        if(rows.length > 0){
            return UserMapper.mapUserFromSqlResult(rows[0])
        }
        else{
            console.log(`Usuario con ID ${userId} no encontrado o inactivo/no verificado.`)
            return undefined
        }
    }

    static async getUserByEmail(email) {
        const query = `SELECT * FROM Users WHERE email = ?`

        const [rows] = await pool.execute(query, [email])
        if(rows.length > 0){
            return UserMapper.mapUserFromSqlResult(rows[0])
        }
        else{
            return undefined
        }
    }

    static async createUser(user) {
        const {
            username, 
            email, 
            password,
            active,
            verify_email
        } = user

        const query = `INSERT INTO Users (username, email, password, active, verify_email) VALUES (?, ?, ?, ?, ?)`

        const [result] = await pool.execute(query, [username, email, password, active, verify_email])
        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.error("Error al crear el usuario en la base de datos.")
        }
    }

    static async updateUser(user) {
        const {
            id,
            username, 
            email, 
            password,
            active,
            verify_email,
            thumbnail, 
            telephone,
            public_state,
            description_content,
            address_content
        } = user

        const query = `UPDATE Users SET username = ?, email = ?, password = ?, active = ?, verify_email = ?, thumbnail = ?, telephone = ?, public_state = ?, description_content = ?, address_content = ? WHERE id = ?`

        const [result] = await pool.execute(query, [username, email, password, active, verify_email, thumbnail, telephone, public_state, description_content, address_content, id])

        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log("No se pudo actualizar el usuario. Puede que no exista.")
            return undefined
        }
    }
}

export default UserRepository
