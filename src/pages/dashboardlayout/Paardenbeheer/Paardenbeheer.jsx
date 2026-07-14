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
    console.log("Token lengte:", token?.length);

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

                console.log("Status:", response.status);

                const responseText = await response.text();

                console.log("Backend antwoord:", responseText);

                if (!response.ok) {
                    return;
                }

                const data = JSON.parse(responseText);

                setHorses(data);

            } catch (error) {
                console.error(error);
            }
        }
            getHorses();

    }, [token]);

    async function toggleHorseActive(horse) {
        try {
            const response = await fetch(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/horses/${horse.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        active: !horse.active
                    }),
                }
            );

            if (!response.ok) {
                console.error("Status wijzigen mislukt");
                return;
            }

            setHorses(previousHorses =>
                previousHorses.map(previousHorse =>
                    previousHorse.id === horse.id
                        ? {
                            ...previousHorse,
                            active: !previousHorse.active
                        }
                        : previousHorse
                )
            );

        } catch (error) {
            console.error(error);
        }
    }

    async function deleteHorse(horseId) {
        if (!window.confirm("Weet je zeker dat je dit paardenprofiel wilt verwijderen?"))
            return;

        try  {
            const response = await fetch(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/horses/${horseId}`,
                {
                    method: "DELETE",
                    headers: {
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.error("Paard verwijderen mislukt");
                console.log("Status:", response.status);
                return;
            }

            // Row wordt visueel verwijderd
            setHorses(previousHorses =>
                previousHorses.filter(horse => horse.id !== horseId)
            );

        } catch (error) {
            console.error(error);
        }
    }

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
                    deleteHorse={deleteHorse}
                    toggleHorseActive={toggleHorseActive}
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
// - paard verwijderen
// - Paard bewerken
// - detailpagina kunnen bijwerken