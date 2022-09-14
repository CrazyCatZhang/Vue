import parse from "./parse";

const templateString = `
    <div class="test" id="test">
        <h3>你好</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`

const result = parse(templateString)
console.log(result)