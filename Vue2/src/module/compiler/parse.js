const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 他匹配到的分组是一个 标签名  <xxx 匹配到的是开始 标签的名字
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);  // 匹配的是</xxxx>  最终匹配到的分组就是结束标签的名字
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;  // 匹配属性
const startTagClose = /^\s*(\/?)>/;  // <div> <br/>

export default function parseHTML(html) {

    const ELEMENT_TYPE = 1
    const TEXT_TYPE = 3
    let root, currentParent
    const stack = []

    function createASTElement(tag, attrs) {
        return {
            tag,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        }
    }

    function start(tag, attrs) {
        const astNode = createASTElement(tag, attrs)
        if (!root) {
            root = astNode
        }
        if (currentParent) {
            astNode.parent = currentParent
            currentParent.children.push(astNode)
        }
        stack.push(astNode)
        currentParent = astNode
    }

    function chars(text) {
        text = text.replace(/\s/g, '')
        text && currentParent.children.push({
            type: TEXT_TYPE,
            text,
            parent: currentParent
        })
    }

    function end(tag) {
        const endNode = stack.pop()
        if (tag[1] === endNode.tag) currentParent = stack[stack.length - 1]
        else throw new Error('缺失相对应的标签...')
    }

    function advance(n) {
        html = html.substring(n)
    }

    function parseStartTag() {
        const startTag = html.match(startTagOpen)
        if (startTag) {
            const match = {
                tagName: startTag[1],
                attrs: []
            }
            advance(startTag[0].length)
            let attrs, end
            while (!(end = html.match(startTagClose)) && (attrs = html.match(attribute))) {
                advance(attrs[0].length)
                match.attrs.push({
                    name: attrs[1],
                    value: attrs[3] || attrs[4] || attrs[5] || true
                })
            }
            if (end) {
                advance(end[0].length)
            }
            return match
        }
        return false
    }

    while (html) {
        let textEnd = html.indexOf('<')
        if (textEnd === 0) {
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                end(endTagMatch)
                advance(endTagMatch[0].length)
                continue
            }
        }
        if (textEnd > 0) {
            const textContent = html.substring(0, textEnd)
            if (textContent) {
                chars(textContent)
                advance(textContent.length)
            }
        }
    }

    return root
}