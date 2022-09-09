import vnode from "./vnode";

export default function (sel, data, c) {
    if (arguments.length !== 3) {
        throw new Error('h函数必须传入三个参数')
    } else if (typeof c === 'string' || typeof c === 'number') {
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        let children = []
        for (let i = 0; i < c.length; i++) {
            if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('传入的参数不是h函数')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('传入的参数类型不对')
    }
}