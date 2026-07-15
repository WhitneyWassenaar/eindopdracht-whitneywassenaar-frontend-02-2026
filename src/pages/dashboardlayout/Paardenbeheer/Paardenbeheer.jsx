// React
import {useState, useEffect, useContext} from 'react';

// Components
import Button from '../../../components/ui/Button/Button.jsx';
import HorseTable from '../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx';
import HorseDetail from '../../../components/page-components/paardenbeheer/HorseDetail/HorseDetail.jsx';
import CreateHorseProfileForm from '../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx';

// Context
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";

// Data
import projectId from '../../../data/projectId.js';

// CSS
import './Paardenbeheer.css'

function Paardenbeheer() {

    const [horses, setHorses] = useState([]);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [contacts, setContacts] = useState([]);

    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);

    const [sortOption, setSortOption] = useState("none");
    const [showSort, setShowSort] = useState(false);

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
                console.table(
                    data.map(horse => ({
                        paard: horse.name,
                        eigenaar: horse.ownerId,
                        verzorger: horse.caretakerId,
                        trainer: horse.trainerId
                    }))
                );

                setHorses(data);

                // setHorses(data);

            } catch (error) {
                console.error(error);
            }
        }

        getHorses();

    }, [token]);

    useEffect(() => {
        if (!token) return;

        async function getContacts() {
            try {
                const response = await fetch(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/persons",
                    {
                        headers: {
                            "novi-education-project-id": projectId,
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    return;
                }

                const data = await response.json();

                setContacts(data);

            } catch (error) {
                console.error(error);
            }
        }

        getContacts();

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

        try {
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

    const filteredHorses = horses.filter((horse) => {
        if (filter === "active") {
            return horse.active;
        }

        if (filter === "inactive") {
            return !horse.active;
        }

        return true;
    });

    const sortedHorses = [...filteredHorses].sort((a, b) => {

        if (sortOption === "name-ascending") {
            return a.name.localeCompare(b.name);
        }

        if (sortOption === "name-descending") {
            return b.name.localeCompare(a.name);
        }

        if (sortOption === "age-young") {
            return new Date(b.birthDate) - new Date(a.birthDate);
        }

        if (sortOption === "age-young") {
            return new Date(a.birthDate) - new Date(b.birthDate);
        }

        return 0;
    });

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

                    <HorseDetail
                        horse={selectedHorse}
                        contacts={contacts}
                        setHorses={setHorses}
                        setSelectedHorse={setSelectedHorse}
                    />
                </>
            ) : (
                <>
                    <p>
                        Totaal aantal paardenprofielen:
                        <strong>{horses.length}</strong>
                    </p>

                    <div className="paardenbeheer-actions">
                        <Button
                            variant="filter-sort"
                            type="button"
                            onClick={() => {
                                setShowFilter(!showFilter);
                                setShowSort(false);
                            }}
                        >
                            Filter
                        </Button>


                        <Button
                            variant="filter-sort"
                            type="button"
                            onClick={() => {
                                setShowSort(!showSort);
                                setShowFilter(false);
                            }}
                        >
                            Sorteren
                        </Button>
                    </div>

                    {showFilter && (
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">
                                Alle paarden
                            </option>

                            <option value="active">
                                Actieve paarden
                            </option>

                            <option value="inactive">
                                Inactieve paarden
                            </option>
                        </select>
                    )}

                    {showSort && (
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="none"
                            >
                                Geen sortering
                            </option>

                            <option value="name-ascending"
                            >
                                Naam A-Z
                            </option>

                            <option value="name-descending"
                            >
                                Naam Z-A
                            </option>

                            <option value="age-young"
                            >
                                Jongste eerst
                            </option>

                            <option value="age-old"
                            >
                                Oudste eerst
                            </option>
                        </select>
                    )}

                    <HorseTable
                        horses={sortedHorses}
                        setSelectedHorse={setSelectedHorse}
                        deleteHorse={deleteHorse}
                        toggleHorseActive={toggleHorseActive}
                        contacts={contacts}
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
                            contacts={contacts}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Paardenbeheer;