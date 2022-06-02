import connection from './index.js'
import read from './read.js'

export default async function write(id){
    
    const released = await read(id)
    console.log(released.length)
    if(released.length == 0){

        return connection.query(`INSERT INTO users(id, released) VALUES (${id},1)`, (error) => {
            console.log(error)
            if(error) return 'error'

    
        })

    }

    return connection.query(
        `UPDATE users SET released = ${released[0].released + 1} WHERE id = ${id}`,
        (err) => {
            if(err) throw err
        }
    )
}