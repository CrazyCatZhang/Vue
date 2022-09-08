import Scanner from "./Scanner";
import nestTokens from "./nestTokens";
import Trim from "./trim";

export default function parseTemplateToTokens(templateStr) {
    const tokens = []
    const scanner = new Scanner(templateStr)
    let words = ''
    while (!scanner.eos()) {
        words = scanner.scanUntil('{{')
        if (words !== '') {
            tokens.push(['text', Trim(words)])
        }
        scanner.scan('{{')

        words = scanner.scanUntil('}}')
        if (words !== '') {
            if (words[0] === '#') {
                tokens.push(['#', words.substring(1)])
            } else if (words[0] === '/') {
                tokens.push(['/', words.substring(1)])
            } else {
                tokens.push(['name', words])
            }
        }
        scanner.scan('}}')
    }
    return nestTokens(tokens)
}