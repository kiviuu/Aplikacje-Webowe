import { useEffect, useState } from "react";
function Licznik(){
    let [count, setCount] = useState<number>(0);

    useEffect( () => {
        console.log("Licznik zwiększył się do " + count);
    } );

    useEffect( () => {
        console.log("Hello World :)");
    }, [] );

    return <>
        <div>Licznik: {count}</div>
        <button onClick={() => setCount(count + 1)}>Dodaj</button>
    </>
}
export default Licznik;