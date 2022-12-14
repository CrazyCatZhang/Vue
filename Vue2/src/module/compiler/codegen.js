const defaultTagRE = /{{((?:.|\r?\n)+?)}}/g

function genProps(props) {
    let str = ''
    for (let i = 0; i < props.length; i++) {
        let attr = props[i];
        if (attr.name === 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':');
                obj[key] = value;
            });
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`
}

function gen(node) {
    if (node.type === 1) {
        return codegen(node);
    } else {
        let text = node.text
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        } else {
            let tokens = [];
            let match;
            defaultTagRE.lastIndex = 0;
            let lastIndex = 0;
            while (match = defaultTagRE.exec(text)) {
                let index = match.index
                if (index > lastIndex) {
                    tokens.push(JSON.stringify(text.slice(lastIndex, index)))
                }
                tokens.push(`_s(${match[1].trim()})`)
                lastIndex = index + match[0].length
            }
            if (lastIndex < text.length) {
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
            return `_v(${tokens.join('+')})`
        }
    }
}

function genChildren(children) {
    return children.map(child => gen(child)).join(',')
}

export default function codegen(ast) {
    const children = genChildren(ast.children)
    const props = genProps(ast.attrs)
    return (`_c('${ast.tag}',${ast.attrs.length > 0 ? `${props}` : 'null'
    }${ast.children.length ? `,${children}` : ''
    })`)
}