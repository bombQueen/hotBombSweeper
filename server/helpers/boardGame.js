function randomBomb(num) {
    let bombs = []
    for (let i = 0; i < num; i++) {
        let x = Math.ceil(Math.random() * 10);
        let y = Math.ceil(Math.random() * 10);
        bombs.push(`${x},${y}`)
    }

    return bombs
}

module.exports = randomBomb