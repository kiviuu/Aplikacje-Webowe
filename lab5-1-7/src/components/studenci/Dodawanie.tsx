import {useState} from 'react';

interface student{
    firstName: string,
    lastName: string,
    year: number
}
function Dodawanie({students, setStudents}:{students:student[], setStudents:Function}){
    let [inputFirstName, setInputFirstName] = useState<string>("");
    let [inputLastName, setInputLastName] = useState<string>("");
    let [inputYear, setInputYear] = useState<number>(2000);

    return <>
        <input type="text" value={inputFirstName} onChange={(e) => {setInputFirstName(e.target.value)}}></input>
        <input type="text" value={inputLastName} onChange={(e) => {setInputLastName(e.target.value)}}></input>
        <input type="number" min="2000" max="2027" value={inputYear} onChange={(e) => {setInputYear( Number(e.target.value))}}></input>
        <input type="button" value="Dodaj"
            onClick={
                () => {
                    if(inputFirstName==="") alert("Wypełnij pole FirstName");
                    else if(inputLastName==="") alert("Wypełnij pole LastName");
                    else if(inputYear===-1) alert("Wypełnij pole Year");
                    else if( inputYear<2000 || inputYear> 2027) alert("Podana data jest błędna");
                    else{
                        let newStudent: student ={
                            firstName:inputFirstName,
                            lastName:inputLastName,
                            year:inputYear
                        };
                        setInputFirstName("");
                        setInputLastName("");
                        setInputYear(2000);
                        setStudents( [...students, newStudent] );
                    }
                }
            }
        ></input>
    </>
}

export default Dodawanie;