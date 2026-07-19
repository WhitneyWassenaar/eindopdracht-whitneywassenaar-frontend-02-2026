// React
import {useState, useEffect, useContext} from 'react';

// Components
import Button from '../../../components/ui/Button/Button.jsx';
import ContactTable from "../../../components/page-components/contacten/ContactTable/ContactTable.jsx";
import ContactDetail from "../../../components/page-components/contacten/ContactDetail/ContactDetail.jsx";
import CreateContactProfileForm from "../../../components/forms/CreateContactProfileForm/CreateContactProfileForm.jsx";

// Context / hooks
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";

// CSS
import './Contacten.css'
import api from "../../../api/axios.js";

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

        async function getContacts() {
            try {
                const contactData = await api.get(
                    `/users/${user.id}/persons`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setContacts(contactData.data);

            } catch (error) {
                console.error(error);
            }
        }


        async function getHorses() {
            try {
                const horseData = await api.get(
                    `/users/${user.id}/horses`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setHorses(horseData.data);

            } catch (error) {
                console.error(error);
            }
        }

        getContacts();
        getHorses();

    }, [token, user]);


    async function toggleContactActive(contact) {
        try {
            await api.patch(
                `/persons/${contact.id}`,
                {
                    active: !contact.active
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setContacts(previousContacts =>
                previousContacts.map(previousContact =>
                    previousContact.id === contact.id
                        ? {
                            ...previousContact,
                            active: !previousContact.active
                        }
                        : previousContact
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

            // Row wordt visueel verwijderd, contact wordt uit de state gehaald
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
                        <select
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
                    )}


                    {showSort && (
                        <select
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