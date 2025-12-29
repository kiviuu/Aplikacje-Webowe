import { useState } from "react"

interface test{
    name: string,
    cost: number
}

function Aktualizacja(){
    let [objTest, setObjTest] = useState<test>({name: "Pomidor", cost: 50.00})
    return <>
        <div>Nazwa: {objTest.name}  Cost: {objTest.cost}</div>
        <button onClick={() => setObjTest( prev => ({...prev, cost: 100.00}) )}>Aktualizuj</button>
    </>
}

export default Aktualizacja;