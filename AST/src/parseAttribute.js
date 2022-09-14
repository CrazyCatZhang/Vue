export default function (attrString) {
    let result = []
    if (attrString === undefined) return result
    attrString = attrString.trim()
    let isMatchQuot = false
    let point = 0

    for (let i = 0; i < attrString.length; i++) {
        const char = attrString[i]
        if (char === '"') {
            isMatchQuot = !isMatchQuot
        } else if (char === ' ' && !isMatchQuot) {
            result.push(attrString.substring(point, i).trim())
            point = i
        }
    }
    result.push(attrString.substring(point).trim())
    result = result.map(item => {
        const res = item.match(/^(.+)="(.+)"$/)
        return {
            name: res[1],
            value: res[2]
        }
    })
    return result
}