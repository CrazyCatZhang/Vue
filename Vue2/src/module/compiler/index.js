import parseHTML from "./parse";

export default function compileToFunction(template) {
    const ast = parseHTML(template)
    console.log(ast)
}