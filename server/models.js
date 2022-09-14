module.exports = {
  getPass: `SELECT * FROM fambamschema.credentiales
    WHERE username=$1 AND pass=$2;`,
  roomLogin: `SELECT room_id FROM fambamschema.roomList
    WHERE room_name=$1 AND room_pass=$2;`,
  addRoomList: `INSERT INTO fambamschema.roomList (
    room_id,
    room_name,
    room_pass,
    owner_id
  ) VALUES($1, $2, $3, $4);`,
  changeCurrentRoom: `SELECT room_id FROM fambam.roomList WHERE room_name=$1 AND room_pass=$2`,
}