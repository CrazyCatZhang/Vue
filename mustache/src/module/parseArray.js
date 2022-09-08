import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function (token, data) {
    const value = lookup(data, token[1])
    let result = ''
    for (let i = 0; i < value.length; i++) {
        result += renderTemplate(token[2], {
            ...value[i],
            '.': value[i]
        })
    }
    return result
}