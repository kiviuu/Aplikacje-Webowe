import { useState } from "react";
function Formularz(){
    let [dataInput, setDataInput] = useState("Coś tu kiedys będzie...");
    return <form>
        <div>{dataInput}</div>
        <input type="text" value={dataInput} onChange={(e) => setDataInput(e.target.value)} />
    </form>
}
export default Formularz;