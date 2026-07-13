import {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";

import Button from '../../../components/ui/Button/Button.jsx';
import HorseTable from '../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx';
import HorseDetail from '../../../components/page-components/paardenbeheer/HorseDetail/HorseDetail.jsx';
import CreateHorseProfileForm from '../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx';
import projectId from '../../../data/projectId.js';

import './Paardenbeheer.css'

function Paardenbeheer() {

    const [horses, setHorses] = useState([]);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const {token} = useContext(AuthContext);

    useEffect(() => {
        if (!token) return;

    async function getHorses() {
        try {
            const response = await fetch(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/horses",
                {
                    headers: {
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setHorses(data);

        } catch (error) {
            console.error(error);
        }
    }
            getHorses();

    }, [token]);


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
                    <CreateHorseProfileForm
                        setHorses={setHorses}
                        setShowForm={setShowForm}
                    />
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