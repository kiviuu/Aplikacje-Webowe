import Przycisk from "./Przycisk";
import { useState } from "react";

function NowyLicznik(){
    let [count, setCount] = useState<number>(0);
    return <>
        <div>Licznik: {count}</div>
        <Przycisk setCount={setCount} count={count} />
    </>
}
export default NowyLicznik;