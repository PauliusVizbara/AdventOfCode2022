import { getInput } from "../../api/api";

export default async () => {

    const data = await getInput(1)
    const a = 5
    console.log(a);
}