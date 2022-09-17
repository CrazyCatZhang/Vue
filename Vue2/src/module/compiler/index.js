import parseHTML from "./parse";
import codegen from "./codegen";


export default function compileToFunction(template) {
    const ast = parseHTML(template)
    let code = codegen(ast)
    code = `with(this){
        return ${code}
    }`
    let render = new Function(code)
    return render
}