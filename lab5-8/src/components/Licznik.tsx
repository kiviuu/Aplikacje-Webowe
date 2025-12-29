import { useEffect, useState } from 'react';
function Licznik(){
    let cnt:string|null = window.localStorage.getItem("count")
    if (cnt === null){
        window.localStorage.setItem("count", "0");
    }
    let [count, setCount] = useState<number>(Number(cnt))

    useEffect( ()=> {
        window.localStorage.setItem("count", count.toString());
    }, [count] );
    return<>
        <div>
            <div>Licznik: {count}</div>
            <input type="button" value="Dodaj" 
            onClick={ () => {
            setCount(prev => prev + 1);
            }} />
        </div>
    </>
}
export default Licznik;