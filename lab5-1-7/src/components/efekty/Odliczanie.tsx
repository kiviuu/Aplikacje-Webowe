import {useState, useEffect} from 'react';

function Odliczanie(){
    let [cnt, setCnt] = useState<number>(15.0);
    let [isStopped, setIsStopped] = useState<boolean>(true);
    let [isDisabled, setIsDisabled] = useState<boolean>(false);
    let [btnValue, setBtnValue] = useState<string>("START");
    

    useEffect(() => {
        let timer: number
        if(!isStopped){
             timer = setInterval(
                ()=>{ setCnt(prev => (prev - 0.1)) }
            ,100);
            if(cnt <= 0){
                clearInterval(timer);
                setCnt(0);
                setIsDisabled(true);
                setBtnValue("Odliczanie zakończone!");
            }
        };
        return () => clearInterval(timer);
    }, [cnt, isStopped]);

    return <>
        <div>Stan odliczania: {cnt.toFixed(1)}</div>
        <input type="button" value={btnValue} disabled={isDisabled}
        onClick={ () => {
            (btnValue==="START") ? setBtnValue("STOP") : setBtnValue("START");
            setIsStopped(prev => (!prev));
        } }></input>
    </>
}

export default Odliczanie;