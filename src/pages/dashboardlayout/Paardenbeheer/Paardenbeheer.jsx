import {useState} from 'react';

import horseData from '../../../data/json/horses.json';

import Button from '../../../components/ui/Button/Button.jsx';
import HorseTable from '../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx';
import HorseDetail from '../../../components/page-components/paardenbeheer/HorseDetail/HorseDetail.jsx';

import './Paardenbeheer.css'
import CreateHorseProfileForm from "../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx";

function Paardenbeheer() {

    const [horses, setHorses] = useState(horseData);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [showForm,setShowForm] = useState(false);

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

                    <Button
                        type="button"
                        onClick={() => setShowForm(true)}
                    >
                        Paardenprofiel toevoegen
                    </Button>

                    {showForm && (
                        <CreateHorseProfileForm setHorses={setHorses}/>
                    )}
                </>
            )}

        </div>
    );
}

export default Paardenbeheer;

//TODO
// - Paard toevoegen
// - paard verwijderen
// - Paard bewerken
// - detailpagina kunnen bijwerken