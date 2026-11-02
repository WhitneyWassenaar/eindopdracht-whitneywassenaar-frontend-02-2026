// React
import {useState, useEffect, useContext} from 'react';

// Components
import Button from '../../../components/ui/Button/Button.jsx';
import HorseTable from '../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx';
import HorseDetail from '../../../components/page-components/paardenbeheer/HorseDetail/HorseDetail.jsx';
import CreateHorseProfileForm from '../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx';

import {getHorses, getContacts, updateHorseActive, deleteHorseFromApi} from "../../../services/horseService.js";

// Context
import {AuthContext} from "../../../context/AuthContext.jsx";

// CSS
import './Paardenbeheer.css'

function Paardenbeheer() {

    const [horses, setHorses] = useState([]);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortOption, setSortOption] = useState("none");
    const {token, user} = useContext(AuthContext);

    useEffect(() => {
        if (!token || !user) return;
        async function loadHorses() {
            try {
                const horseData = await getHorses(user.id, token);
                setHorses(horseData);
            } catch (error) {
                console.error(error);
            }
        }
        loadHorses();
    }, [token, user]);

    useEffect(() => {
        if (!token || !user) return;
        async function loadContacts() {
            try {
                const contactData = await getContacts(user.id, token);
                setContacts(contactData);
            } catch (error) {
                console.error(error);
            }
        }
        loadContacts();
    }, [token, user]);

    async function toggleHorseActive(horse) {
        try {
            await updateHorseActive(horse.id, horse.active, token);
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
            console.error("Status wijzigen mislukt:", error);
        }
    }

    async function deleteHorse(horseId) {

        if (!window.confirm("Weet je zeker dat je dit paardenprofiel wilt verwijderen?")) {
            return;
        }

        try {
            await deleteHorseFromApi(horseId, token);

            setHorses(previous =>
                previous.filter(horse => horse.id !== horseId)
            );

        } catch (error) {
            console.error("Paard verwijderen mislukt:", error);
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

        if (sortOption === "age-old") {
            return new Date(a.birthDate) - new Date(b.birthDate);
        }
        return 0;
    });

    return (
        <section className="paardenbeheer-page">
            <section className="paardenbeheer-inner-container">
                <h1>Paardenbeheer</h1>
                <p className="horse-profile-count">
                    Totaal aantal paardenprofielen:{" "}
                    <strong>{horses.length}</strong>
                </p>

                <div className="paardenbeheer-actions">
                    <label
                        htmlFor="horse-filter">
                        Toon paarden: {" "}

                        <select
                            id="horse-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">Alle paarden</option>
                            <option value="active">Actieve paarden</option>
                            <option value="inactive">Inactieve paarden</option>
                        </select>
                    </label>

                    <label
                        htmlFor="horse-sort"
                    >
                        Sorteer op:{" "}

                        <select
                            id="horse-sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="none">Geen sortering</option>
                            <option value="name-ascending">Naam A-Z</option>
                            <option value="name-descending">Naam Z-A</option>
                            <option value="age-young">Jongste eerst</option>
                            <option value="age-old">Oudste eerst</option>
                        </select>
                    </label>


                </div>

                <div className="horse-overview-content">
                    <div className="horse-table-container">
                        <HorseTable
                            horses={sortedHorses}
                            setSelectedHorse={setSelectedHorse}
                            deleteHorse={deleteHorse}
                            toggleHorseActive={toggleHorseActive}
                            contacts={contacts}
                        />
                    </div>

                    <div className="profile-container">
                        {showForm ? (
                            <CreateHorseProfileForm
                                setHorses={setHorses}
                                setShowForm={setShowForm}
                                contacts={contacts}
                            />
                        ) : selectedHorse ? (
                            <HorseDetail
                                horse={selectedHorse}
                                contacts={contacts}
                                setHorses={setHorses}
                                setSelectedHorse={setSelectedHorse}
                            />
                        ) : (
                            <div className="horse-profile-empty-state">
                                <h2>Geen profiel geselecteerd</h2>
                                <p>
                                    Selecteer een paardenprofiel uit de tabel om de profielgegevens te bekijken, of maak
                                    een
                                    nieuw paardenprofiel aan.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <footer className="paardenbeheer-footer">
                    <Button
                        type="button"
                        onClick={() => {
                            setShowForm(true);
                            setSelectedHorse(null);
                        }}
                    >
                        Nieuw profiel aanmaken
                    </Button>
                </footer>

            </section>
        </section>
    )
        ;
}

export default Paardenbeheer;