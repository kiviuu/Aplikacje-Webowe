function Ternary(){
    let a: boolean = true;
    let b: boolean = false;

    return <>
        <br />
        {a ? <div>Twierdzenie A jest prawdziwe</div> : <div>Twierdzenie A jest fałszywe</div>}
        {b ? <div>Twierdzenie B jest prawdziwe</div> : <div>Twierdzenie B jest fałszywe</div>}
    </>
}
export default Ternary;