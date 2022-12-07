
import { getInput } from "../../api/api.js";

export default async () => {

    const data = (await getInput(7, '\n')).filter(row => row !== '')
    // const data = [
    //     '$ cd /',
    //     '$ ls',
    //     'dir a',
    //     '14848514 b.txt',
    //     '8504156 c.dat',
    //     'dir d',
    //     '$ cd a',
    //     '$ ls',
    //     'dir e',
    //     '29116 f',
    //     '2557 g',
    //     '62596 h.lst',
    //     '$ cd e',
    //     '$ ls',
    //     '584 i',
    //     '$ cd ..',
    //     '$ cd ..',
    //     '$ cd d',
    //     '$ ls',
    //     '4060174 j',
    //     '8033020 d.log',
    //     '5626152 d.ext',
    //     '7214296 k',
    // ]
    const sizeByPath: { [key: string]: number } = {}
    const currentPath = []

    for (let i = 0; i < data.length; i++) {
        const input = data[i];
        if (input[0] === '$') {
            const [command, argument] = input.slice(2).split(' ')
            console.log(command, argument);
            if (command === 'cd') {
                if (argument === '..') {
                    currentPath.pop()
                } else {
                    currentPath.push(argument)
                }
            }

            if (command === 'ls') {
                const pathContent = []
                while (data[i + 1] && data[i + 1][0] !== '$') {
                    pathContent.push(data[++i].split(' '))
                }
                const path = currentPath.join('/')

                sizeByPath[path] = 0
                pathContent.forEach(([firstParam]) => {
                    if (firstParam !== 'dir') {
                        sizeByPath[path] += +firstParam
                    }
                });

                const newPath = [...currentPath]
                newPath.pop()
                while (newPath.length) {
                    sizeByPath[newPath.join('/')] += sizeByPath[path]
                    newPath.pop()
                }
            }
        }
    }



    const totalSize = sizeByPath['/']
    const minDirToDelete = Object.values(sizeByPath).filter((size) => totalSize + 3e7 - size <= 7e7).sort((a, b) => b - a).pop()
    console.log(minDirToDelete)
}