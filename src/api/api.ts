import fetch from 'node-fetch';

export const getInput = async (day: number) => {
    const url = `https://adventofcode.com/2021/day/${day}/input`
    const data = await fetch(url)
    console.log(data);
}