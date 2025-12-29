import { useState } from "react";
function Licznik(){
    let [count, setCount] = useState<number>(0);
    return <>
        <div>Licznik: {count}</div>
        <button onClick={() => setCount(count + 1)}>Dodaj</button>
    </>
}
export default Licznik;