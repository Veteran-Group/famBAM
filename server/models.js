module.exports = {
  getPass: `SELECT * FROM fambamschema.credentiales
              WHERE username=$1 AND pass=$2;`,
  roomLogin: `SELECT room_id FROM fambamschema.roomList
              WHERE room_name=$1 AND room_pass=$2;`,
}