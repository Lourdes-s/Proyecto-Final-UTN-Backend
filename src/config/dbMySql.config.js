import mysql from 'mysql2/promise'
import ENVIROMENT from './eviroment.js'

const pool = mysql.createPool(
    {
        host: ENVIROMENT.MY_SQL.HOST,
        user: ENVIROMENT.MY_SQL.USERNAME, 
        password: ENVIROMENT.MY_SQL.PASSWORD,
        database: ENVIROMENT.MY_SQL.DATABASE
    }
)

pool.getConnection().then(
    (connection) => {
        console.log('Conexion con mysql exitosa')
        connection.release()
    }
)
.catch(
    (err) =>{
        console.error('Error en conexion con MySQL:', err)
    }
)

export default pool