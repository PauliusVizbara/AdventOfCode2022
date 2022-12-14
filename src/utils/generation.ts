import { writeFileSync, mkdirSync } from 'fs'

const day = process.argv[2]
const indexContent = `import ${day}_1 from './${day}_1.js';
import ${day}_2 from './${day}_2.js'

${day}_1()`;

const puzzleContent = `
import { getInput } from "../../api/api.js";

export default async () => {

    const data = (await getInput(${day.slice(3)}, '\\n'))
}`

try {
    mkdirSync(`./src/solutions/${day}`)
    writeFileSync(`./src/solutions/${day}/index.ts`, indexContent);
    writeFileSync(`./src/solutions/${day}/${day}_1.ts`, puzzleContent);
    writeFileSync(`./src/solutions/${day}/${day}_2.ts`, puzzleContent);
} catch (err) {
    console.error(err);
}