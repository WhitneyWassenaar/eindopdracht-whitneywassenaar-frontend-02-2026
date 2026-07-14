import {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";

import Button from '../../../components/ui/Button/Button.jsx';
import ContactTable from "../../../components/page-components/contacten/ContactTable/ContactTable.jsx";
// import CreateContactForm from '../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx';

import projectId from '../../../data/projectId.js';

import './Contacten.css'
import ContactDetail from "../../../components/page-components/contacten/ContactDetail/ContactDetail.jsx";
import CreateContactProfileForm from "../../../components/forms/CreateContactProfileForm/CreateContactProfileForm.jsx";

function Contacten() {

    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [horses, setHorses] = useState([]);

    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);

    const [sortOption, setSortOption] = useState("none");
    const [showSort, setShowSort] = useState(false);

    const {token} = useContext(AuthContext);
    console.log("Token lengte:", token?.length);

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

                console.log("Status:", response.status);

                const responseText = await response.text();

                console.log("Backend antwoord:", responseText);

                if (!response.ok) {
                    return;
                }

                const data = JSON.parse(responseText);

                setContacts(data);

            } catch (error) {
                console.error(error);
            }
        }

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
                console.log("Horses:", data);
                setHorses(data);

            } catch (error) {
                console.error(error);
            }
        }
        getContacts();
        getHorses();

    }, [token]);

    async function toggleContactActive(contact) {
        try {
            const response = await fetch(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/persons/${contact.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        active: !contact.active
                    }),
                }
            );

            if (!response.ok) {
                console.error("Status wijzigen mislukt");
                return;
            }

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

        try  {
            const response = await fetch(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/persons/${contactId}`,
                {
                    method: "DELETE",
                    headers: {
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.error("Contact verwijderen mislukt");
                console.log("Status:", response.status);
                return;
            }

            // Row wordt visueel verwijderd
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
                            onChange={(e)=>setSortOption(e.target.value)}
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