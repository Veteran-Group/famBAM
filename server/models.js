module.exports = {
  getPass: `SELECT * FROM fambamschema.credentiales WHERE username=$1 AND pass=$2;`,
}