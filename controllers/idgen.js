function generateRandom(){
    let a = [];
    let hexDigits = "0123456789abcdefgh";
    for(let i = 0; i < 36; i++){
        a[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    a[14] = "4";
    a[19] = hexDigits.substr((a[19] & 0x3) | 0x8,1);
    a[8]  = a[13] = a[18] = a[23] = "-";
    var uuid = a.join("");
    return uuid
}
randomNumber = generateRandom();

module.exports = randomNumber;