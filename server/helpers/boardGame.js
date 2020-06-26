function randomBomb(num) {
    let bombs = []
    for (let i = 0; i < num; i++) {
        let obj = {}
        let x = Math.ceil(Math.random() * 10);
        let y = Math.ceil(Math.random() * 10);
        obj.status = false
        obj.koor = `${x},${y}`
        bombs.push(obj)
    }
    return bombs
}

module.exports = randomBomb