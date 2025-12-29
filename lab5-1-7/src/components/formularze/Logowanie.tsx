import { useState } from "react";
function Logowanie(){
    let [haslo1, setHaslo1] = useState<string>("");
    let [haslo2, setHaslo2] = useState<string>("");
    let isNotActive: boolean = true;
    if (haslo1 !== "" || haslo2 !== "") {
        isNotActive = false;
    } 
    else {
        isNotActive = true;
    }
    return <>
        <br />
        <form>
            <input type="password" value={haslo1} onChange={(e) => setHaslo1(e.target.value)}></input>
            <input type="password" value={haslo2} onChange={(e) => setHaslo2(e.target.value)}></input>
            <button onClick={() => {
                let result: string = "Hasła nie są zgodne!";
                if(haslo1 === haslo2){ result = "Zalogowano poprawnie!" }
                alert(result);
            }} disabled={isNotActive}>Log In</button>
        </form>
        </>
}
export default Logowanie;