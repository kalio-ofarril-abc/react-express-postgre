const Pool = require('pg').Pool

const pool = new Pool({
  user: 'riolwpbzbqepds',
  host: 'ec2-3-233-100-43.compute-1.amazonaws.com',
  database: 'dal2fiqv9or5eg',
  password: '522bdf9bf415ea96f93d14c9e4523d3f9b85087a6c1f242329c56e32d754e20a',
  port: 5432,
  ssl:{rejectUnauthorized: false}
});


const getUser = (body) => {
    return new Promise(function(resolve, reject) {
        const {name, pwd} = body;
        pool.query('SELECT * FROM st_users WHERE name = $1 and pwd = $2', [name,pwd], (error, results) => {
            if (error) {
            reject(error)
            }
            resolve(results);
            //resolve(results.rows);
        })
    }) 
  }
  

  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const {name, email, pwd, userid} = body
      pool.query('INSERT INTO st_users (name, email, pwd, userid) VALUES ($1, $2, $3, $4) RETURNING *', [name, email,pwd,userid], (error, results) => {
        if (error) {
          reject(error)
        }
        //resolve(`A new user has been added added: ${results.rows[0]}`)
        resolve(`${results}`)
      })
    })
  }
  

  const getUserName = (userName) => {
    return new Promise(function(resolve, reject) {
      const name = userName;
      pool.query('SELECT COUNT(*) FROM st_users WHERE name = $1', [name], 
        (error, results) =>{
          if(error){
            reject(error);
          }
          
          if(results.rows[0].count == 1){
            resolve(true);
          }else{
            resolve(false);
          }
          
         //resolve(results.rows[0].count);
        }
      )
    })
  }


  const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getUser,
    getUserName,
    createUser,
    deleteMerchant,
  }