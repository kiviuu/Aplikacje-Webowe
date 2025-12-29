function Przycisk({setCount, count}: {setCount: Function, count: number}){
    return <button onClick={() => setCount(count + 1)}>Dodaj</button>;
}
export default Przycisk;