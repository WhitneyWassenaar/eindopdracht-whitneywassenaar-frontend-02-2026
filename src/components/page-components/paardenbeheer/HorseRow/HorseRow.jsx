import Button from "../../../ui/Button/Button.jsx";
import deleteIcon from "/src/assets/delete-icon.png"
import "./HorseRow.css"
import horseavatar from "../../../../assets/horse-avatar.png"
import persons from "../../../../data/json/persons.json";
import calculateAge from "../../../ui/CalculateAge/CalculateAge.jsx";

function HorseRow({horse,setSelectedHorse}) {

    const owner = persons.find(
        persons => persons.id === horse.ownerId
    );
    return (
       <tr className="horserow-layout"
       onClick={() => setSelectedHorse(horse)}>
           <td>
               <img
                   src={horseavatar}
                   alt={horse.name}
                   />
           </td>

           <td>{horse.name}</td>
           <td>{horse.gender}</td>
           <td>{calculateAge(horse.birthDate)} jaar</td>
           <td>{`${owner.firstName} ${owner.lastName}`}</td>
           <td>
               {horse.status}
           </td>
           <td>
               <Button
               type={"button"}
               variant={"delete"}>
                   <img src={deleteIcon} alt={"delete icon"} />
               </Button>
           </td>
       </tr>
    );
}

export default HorseRow;

// TODO:
// horseavatar vervangen