export default function (str) {
    let isLabel = false
    let words = ''
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '<') {
            isLabel = true
        } else if (str[i] === '>') {
            isLabel = false
        }
        if (!/\s/.test(str[i])) {
            words += str[i]
        } else {
            if (isLabel) {
                words += ' '
            }
        }
    }
    return words
}