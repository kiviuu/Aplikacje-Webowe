import {useState} from "react"
import Dodawanie from "./Dodawanie"

interface student{
    firstName: string,
    lastName: string,
    year: number
}

function StudentManager(){
    let [students, setStudents] = useState<student[]>( [{firstName:"Eliasz",lastName:"Gren",year:2025}, 
        {firstName:"Maks",lastName:"Wojceiszczak",year:2025},
        {firstName:"Jakub",lastName:"Krupa",year:2024}
    ]);
    return <>
        <br /><br /><br />
        <table>
            <thead>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Year</th>
            </thead>
            <tbody>
                {students.map( el => ( <tr> <td>{el.firstName}</td><td>{el.lastName}</td> <td>{el.year}</td> </tr> ) )}
            </tbody>
        </table>
        <Dodawanie students={students} setStudents={setStudents} />
    </>
}

export default StudentManager;