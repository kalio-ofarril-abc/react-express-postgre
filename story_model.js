const Pool = require('pg').Pool

const pool = new Pool({
  user: 'iwrhrhnzygdfmm',
  host: 'ec2-52-86-25-51.compute-1.amazonaws.com',
  database: 'dbrd0g2301qmqp',
  password: '46cfdb8302f71aa7f0f14a49286efdd2a25e1adad28ad59f5a8dd1b37990ccf2',
  port: 5432,
  ssl:{rejectUnauthorized: false}
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM st_users', (error, results) => {
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
      const { name, email, pwd, userid } = body
      pool.query('INSERT INTO st_users (name, email, pwd, userid) VALUES ($1, $2, $3, $4) RETURNING *', [name, email,pwd,userid], (error, results) => {
        if (error) {
          reject(error)
        }
        //resolve(`A new user has been added added: ${results.rows[0]}`)
        resolve(`${results}`)
      })
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
    getUsers,
    createUser,
    deleteMerchant,
  }