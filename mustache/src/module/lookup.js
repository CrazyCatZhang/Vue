export default function (data, keyName) {
    if (keyName.indexOf('.') !== -1 && keyName !== '.') {
        const keys = keyName.split('.')
        let temp = data
        for (let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]]
        }
        return temp
    }
    return data[keyName]
}