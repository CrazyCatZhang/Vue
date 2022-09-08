import lookup from "./lookup";
import parseArray from "./parseArray";

export default function (tokens, data) {
    let resultStr = ''
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        const type = token[0]
        const key = token[1]
        if (type === 'text') {
            resultStr += key
        } else if (type === 'name') {
            resultStr += lookup(data, key)
        } else if (type === '#') {
            resultStr += parseArray(token, data)
        }
    }
    return resultStr
}