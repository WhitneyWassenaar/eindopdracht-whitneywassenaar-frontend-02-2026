// React
import {useState, useEffect, useContext} from 'react';

// Components
import Button from '../../../components/ui/Button/Button.jsx';
import ContactTable from "../../../components/page-components/contacten/ContactTable/ContactTable.jsx";
import ContactDetail from "../../../components/page-components/contacten/ContactDetail/ContactDetail.jsx";
import CreateContactProfileForm from "../../../components/forms/CreateContactProfileForm/CreateContactProfileForm.jsx";

// Context / hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Api
import api from "../../../api/axios.js";

// Services
import { getContacts, updateContactActive } from "../../../services/contactService.js";
import { getHorses } from "../../../services/horseService.js";

// CSS
import './Contacten.css'


function Contacten() {

    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [horses, setHorses] = useState([]);

    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);

    const [sortOption, setSortOption] = useState("none");
    const [showSort, setShowSort] = useState(false);

    const {token, user} = useContext(AuthContext);

    useEffect(() => {
        if (!token || !user) return;

        async function fetchContacts() {
            try {
                const contactData = await getContacts(user.id, token);
                setContacts(contactData);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchHorses() {
            try {
                const horseData = await getHorses(user.id, token);
                setHorses(horseData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContacts();
        fetchHorses();

    }, [token, user]);

    async function toggleContactActive(contact) {
        try {
            await updateContactActive(contact, token);

            setContacts(prevContacts =>
                prevContacts.map(item =>
                    item.id === contact.id
                        ? { ...item, active: !item.active }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteContact(contactId) {
        if (!window.confirm("Weet je zeker dat je dit contact wilt verwijderen?"))
            return;

        try {
            for (const horse of horses) {
                if (
                    Number(horse.ownerId) === Number(contactId) ||
                    Number(horse.caretakerId) === Number(contactId) ||
                    Number(horse.trainerId) === Number(contactId)
                ) {
                    await api.patch(
                        `/horses/${horse.id}`,
                        {
                            ownerId:
                                Number(horse.ownerId) === Number(contactId)
                                    ? null
                                    : horse.ownerId,

                            caretakerId:
                                Number(horse.caretakerId) === Number(contactId)
                                    ? null
                                    : horse.caretakerId,

                            trainerId:
                                Number(horse.trainerId) === Number(contactId)
                                    ? null
                                    : horse.trainerId,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                }

            }
            setHorses(previousHorses =>
                previousHorses.map(horse => ({
                    ...horse,
                    ownerId:
                        Number(horse.ownerId) === Number(contactId)
                            ? null
                            : horse.ownerId,

                    caretakerId:
                        Number(horse.caretakerId) === Number(contactId)
                            ? null
                            : horse.caretakerId,

                    trainerId:
                        Number(horse.trainerId) === Number(contactId)
                            ? null
                            : horse.trainerId,
                }))
            );

            await api.delete(
                `/persons/${contactId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setContacts(previousContacts =>
                previousContacts.filter(contact => contact.id !== contactId)
            );

        } catch (error) {
            console.error(error);
        }
    }

    const filteredContacts = contacts.filter((contact) => {
        if (filter === "active") {
            return contact.active;
        }

        if (filter === "inactive") {
            return !contact.active;
        }

        return true;
    });

    const sortedContacts = [...filteredContacts].sort((a, b) => {

        const fullNameA = `${a.firstName} ${a.lastName}`;
        const fullNameB = `${b.firstName} ${b.lastName}`;

        if (sortOption === "name-ascending") {
            return fullNameA.localeCompare(fullNameB);
        }

        if (sortOption === "name-descending") {
            return fullNameB.localeCompare(fullNameA);
        }

        return 0;
    });

    return (
        <div className="contacten-page">

            <h1>Contacten</h1>

            {selectedContact ? (
                <>
                    <Button
                        type="button"
                        onClick={() => setSelectedContact(null)}
                    >
                        Terug
                    </Button>

                    <ContactDetail
                        contact={selectedContact}
                        horses={horses}
                    />
                </>
            ) : (
                <>
                    <p>
                        Totaal aantal contacten:
                        <strong>{contacts.length}</strong>
                    </p>

                    <div className="contacten-actions">
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
                        <>
                            <label htmlFor="contact-filter">
                                Toon contacten:
                            </label>

                            <select
                                id="contact-filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">
                                    Alle contacten
                                </option>

                                <option value="active">
                                    Actieve contacten
                                </option>

                                <option value="inactive">
                                    Inactieve contacten
                                </option>
                            </select>
                        </>
                    )}

                    {showSort && (
                        <>
                            <label htmlFor="sort-contacts">
                                Sorteer op:
                            </label>

                            <select
                                id="sort-contacts"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="none">
                                    Geen sortering
                                </option>

                                <option value="name-ascending">
                                    Naam A-Z
                                </option>

                                <option value="name-descending">
                                    Naam Z-A
                                </option>
                            </select>
                        </>
                    )}
                    <ContactTable
                        contacts={sortedContacts}
                        setSelectedContact={setSelectedContact}
                        deleteContact={deleteContact}
                        toggleContactActive={toggleContactActive}
                    />

                    <Button
                        type="button"
                        onClick={() => {
                            setShowForm(true);
                        }}
                    >
                        Contact toevoegen
                    </Button>

                    {showForm && (
                        <CreateContactProfileForm
                            setContacts={setContacts}
                            setShowForm={setShowForm}
                        />
                    )}
                </>
            )}

        </div>
    );
}

export default Contacten;