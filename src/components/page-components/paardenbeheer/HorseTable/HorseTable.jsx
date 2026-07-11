import HorseRow from "../HorseRow/HorseRow.jsx";
import "./HorseTable.css"
function HorseTable({horses}) {

    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Foto</th>
                <th>Naam</th>
                <th>Geslacht</th>
                <th>Leeftijd</th>
                <th>Eigenaar</th>
                <th>Status</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {horses.map((horse)=>(
                <HorseRow
                key={horse.id}
            horse={horse}/>
            ))}
            </tbody>
        </table>
    );
}

export default HorseTable;