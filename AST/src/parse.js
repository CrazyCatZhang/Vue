export default function (templateString) {
    let index = 0
    let rest = ''

    // 匹配开始的html标签
    const startTagRegExp = /^<([a-z]+[1-6]?)(\s[^<]+)?>/
    // 匹配结束的html标签
    const endTagRegExp = /^<\/([a-z]+[1-6]?)>/
    // 抓取结束标签前的文字
    const wordRegExp = /^([^<]+)<\/[a-z]+[1-6]?>/

    const stack1 = []
    const stack2 = []

    let result

    while (index < templateString.length - 1) {
        rest = templateString.substring(index)
        if (startTagRegExp.test(rest)) {
            const startTag = rest.match(startTagRegExp)[1]
            stack1.push(startTag)
            stack2.push({tag: startTag, children: []})
            index += startTag.length + 2
        } else if (endTagRegExp.test(rest)) {
            const endTag = rest.match(endTagRegExp)[1]
            const pop_tag = stack1.pop()
            if (endTag === pop_tag) {
                const pop_arr = stack2.pop()
                if (stack2.length) {
                    stack2[stack2.length - 1].children.push(pop_arr)
                } else {
                    result = pop_arr
                }
            } else {
                throw new Error(`${stack1[stack1.length - 1]}标签没有闭合`)
            }
            index += endTag.length + 3
        } else if (wordRegExp.test(rest)) {
            const words = rest.match(wordRegExp)[1]
            if (!/^\s+$/.test(words)) {
                stack2[stack2.length - 1].children.push({
                    text: words,
                    type: 3
                })
            }
            index += words.length
        } else {
            index++
        }
    }
    return result
}