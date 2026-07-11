import './Paardenbeheer.css'
import Button from "../../../components/ui/Button/Button.jsx";
import HorseTable from "../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx";
import CreateHorseProfileForm from "../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx";
import horses from "../../../data/json/horses.json";
import HorseDetail from "../../../components/page-components/paardenbeheer/HorseDetail/HorseDetail.jsx";
import {useState} from "react";

function Paardenbeheer() {

    const [selectedHorse, setSelectedHorse] = useState(null)

    return (
        <div className="paardenbeheer-page">

            <h1>Paardenbeheer</h1>

            {selectedHorse ? (
                <>
                    <Button
                        type="button"
                        onClick={() => setSelectedHorse(null)}
                    >
                        Terug
                    </Button>

                    <HorseDetail horse={selectedHorse}/>
                </>
            ) : (
                <>
                    <p>
                        Totaal aantal paardenprofielen:
                        <strong>{horses.length}</strong>
                    </p>

                    <div className="paardenbeheer-actions">
                        <Button variant="filter-sort">
                            Filter
                        </Button>

                        <Button variant="filter-sort">
                            Sorteren
                        </Button>
                    </div>

                    <HorseTable
                        horses={horses}
                        setSelectedHorse={setSelectedHorse}
                    />

                    <Button type="button">
                        Paardenprofiel toevoegen
                    </Button>
                </>
            )}

        </div>
    )
}

                export default Paardenbeheer;

                {/*//TODO:*/}
                {/*// horse table*/}
                {/*// horse row*/}
                {/*// filter*/}
                {/*// sort*/}
                {/*// Op deze pagina*/}