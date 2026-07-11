import Button from "../../../ui/Button/Button.jsx";
import deleteIcon from "/src/assets/delete-icon.png"
import "./HorseRow.css"
import horseavatar from "../../../../assets/horse-avatar.png"
function HorseRow({horse}) {
    return (
       <tr className="horserow-layout">
           <td>
               <img
                   src={horseavatar}
                   alt={horse.name}
                   />
           </td>

           <td>{horse.name}</td>
           <td>{horse.gender}</td>
           <td>{horse.age}</td>
           <td>{horse.owner}</td>

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