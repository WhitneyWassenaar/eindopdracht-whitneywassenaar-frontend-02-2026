import {useState} from 'react';

import horses from '../../../data/json/horses.json';

import Button from '../../../components/ui/Button/Button.jsx';
import HorseTable from '../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx';
import HorseDetail from '../../../components/page-components/paardenbeheer/HorseDetail/HorseDetail.jsx';

import './Paardenbeheer.css'

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
    );
}

export default Paardenbeheer;