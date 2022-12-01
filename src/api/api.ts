import fetch from 'node-fetch';
import * as dotenv from 'dotenv'
dotenv.config()

export const getInput = async (day: number, seperator: string = '\n') => {
    const url = `https://adventofcode.com/2022/day/${day}/input`
    const res = await fetch(url, { headers: { 'Cookie': `session=${process.env['SESSION']}` } })
    const data = await res.text()
    return data.split(seperator)
}