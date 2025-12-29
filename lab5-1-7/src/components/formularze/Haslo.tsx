import { useState } from "react";
function Haslo(){
    let [haslo1, setHaslo1] = useState<string>("");
    let [haslo2, setHaslo2] = useState<string>("");
    let wiadomosc: string = "";
    if (haslo1 === "" && haslo2 === "") {
        wiadomosc = "Proszę wprowadzić hasło";
    } 
    else if (haslo1 !== haslo2) {
        wiadomosc = "Hasła nie są zgodne";
    } 
    else {
        wiadomosc = "";
    }
    return <>
        <br />
        <form>
            <div>
                {wiadomosc}
            </div>
            <input type="password" value={haslo1} onChange={(e) => setHaslo1(e.target.value)}></input>
            <input type="password" value={haslo2} onChange={(e) => setHaslo2(e.target.value)}></input>
        </form>
        </>
}
export default Haslo;