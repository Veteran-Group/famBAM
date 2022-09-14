module.exports = {
  getRoomSerial: function(roomName) {
    let today = new Date();
    let miliseconds = today.getMilliseconds();
    let seconds = today.getSeconds();
    let minutes = today.getMinutes();
    let hours = today.getHours();
    let year = today.getFullYear();
    let name = roomName.split(' ').join('_');

    let id = `${name}_${hours}_${minutes}_${seconds}_${miliseconds}_${year}`;

    return id;
  }
}