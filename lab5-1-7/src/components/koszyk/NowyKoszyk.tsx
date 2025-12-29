import Produkt from "./Produkt";
function NowyKoszyk() {
    let names: string[] = ["Mleko", "Papaja", "Krowa", "iPhone 17 Pro Max 512GB", "Szachy"];
    return <>
    {names.map((name) => <Produkt name={name} />)}
    </>;
}
export default NowyKoszyk;