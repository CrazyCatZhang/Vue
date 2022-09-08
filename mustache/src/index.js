import parseTemplateToTokens from "./module/parseTemplateToTokens";
import renderTemplate from "./module/renderTemplate";

window.SSG_TemplateEngine = {
    render(templateStr, data) {
        const tokens = parseTemplateToTokens(templateStr)
        return renderTemplate(tokens, data)
    }
}