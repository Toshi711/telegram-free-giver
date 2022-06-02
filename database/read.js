import connection from './index.js'

export default function read(id){

    return new Promise((resolve,reject) => {
        connection.query(`SELECT id,released FROM users WHERE id = ${id}`, function(err,results){
            if(err) reject(err);
            
            resolve(results)
        })
    })

}