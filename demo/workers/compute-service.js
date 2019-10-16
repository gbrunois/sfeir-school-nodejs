function sort() {
    const list = []
    for (let i = 0; i < 10000000; i++) {
        const val = Math.floor(Math.random() * 10000)
        list.push(val)
    }
    list.sort()
    return list
}

module.exports = {
    sort
}