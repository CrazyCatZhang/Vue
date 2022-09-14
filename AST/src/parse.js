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

    while (index < templateString.length - 1) {
        rest = templateString.substring(index)
        if (startTagRegExp.test(rest)) {
            const startTag = rest.match(startTagRegExp)[1]
            stack1.push(startTag)
            stack2.push([])
            index += startTag.length + 2
        } else if (endTagRegExp.test(rest)) {
            const endTag = rest.match(endTagRegExp)[1]
            if (endTag === stack1[stack1.length - 1]) {
                stack1.pop()
            } else {
                throw new Error(`${stack1[stack1.length - 1]}标签没有闭合`)
            }
            index += endTag.length + 3
        } else if (wordRegExp.test(rest)) {
            const words = rest.match(wordRegExp)[1]
            if (!/^\s+$/.test(words)) {
                console.log(words)
            }
            index += words.length
        } else {
            index++
        }
    }
}