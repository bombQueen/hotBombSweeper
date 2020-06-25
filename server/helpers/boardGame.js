function randomBomb() {
    let bombs = []

    for (let i = 0; i < 5; i++) {
        const temp = [];
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        temp.push(x)
        temp.push(y)
        bombs.push(temp)
    }

    return bombs
}

console.log(randomBomb());