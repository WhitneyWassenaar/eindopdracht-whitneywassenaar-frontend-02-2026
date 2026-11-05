// React
import {useState, useEffect, useContext} from 'react';

// react Router
import {useParams, useNavigate} from 'react-router-dom';

// Components
import Button from '../../../components/ui/Button/Button.jsx';
import ContactTable from "../../../components/page-components/contacten/ContactTable/ContactTable.jsx";
import ContactDetail from "../../../components/page-components/contacten/ContactDetail/ContactDetail.jsx";
import CreateContactProfileForm from "../../../components/forms/CreateContactProfileForm/CreateContactProfileForm.jsx";

// Context / hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import { getContacts, updateContactActive, deleteContactFromApi } from "../../../services/contactService.js";
import { getHorses, updateHorseRelations } from "../../../services/horseService.js";

// CSS
import './Contacten.css'


function Contacten() {
    const {contactId} = useParams();
    const navigate = useNavigate();



    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [horses, setHorses] = useState([]);

    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);

    const [sortOption, setSortOption] = useState("none");
    const [showSort, setShowSort] = useState(false);

    const [isLoadingContacts, setIsLoadingContacts] = useState(false);
    const [contactsError, setContactsError] = useState("");

    const [isLoadingHorses, setIsLoadingHorses] = useState(false);
    const [horsesError, setHorsesError] = useState("");

    const [updatingContactId, setUpdatingContactId] = useState(null);
    const [updateContactError, setUpdateContactError] = useState("");

    const [deletingContactId, setDeletingContactId] = useState(null);
    const [deleteContactError, setDeleteContactError] = useState("");

    const selectedContact = contacts.find(
        contact => String(contact.id) === contactId
    ) || null;



    const {token, user} = useContext(AuthContext);

    useEffect(() => {
        if (!token || user?.id == null) return;

        const userId = user.id;
        const controller = new AbortController();

        async function fetchContacts() {
            try {
                setIsLoadingContacts(true);
                setContactsError("");

                const contactData = await getContacts(
                    userId,
                    token,
                    controller.signal
                );

                if (controller.signal.aborted) return;

                setContacts(contactData);
            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error("Contacten ophalen mislukt:", error);
                setContactsError("Het ophalen van de contacten is mislukt.");
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingContacts(false);
                }
            }
        }

        async function fetchHorses() {
            try {
                setIsLoadingHorses(true);
                setHorsesError("");

                const horseData = await getHorses(
                    userId,
                    token,
                    controller.signal
                );

                if (controller.signal.aborted) return;

                setHorses(horseData);
            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error("Paarden ophalen mislukt:", error);
                setHorsesError("Het ophalen van de paarden is mislukt.");
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingHorses(false);
                }
            }
        }

        fetchContacts();
        fetchHorses();

        return () => {
            controller.abort();
        };
    }, [token, user?.id]);

    async function toggleContactActive(contact) {
        try {
            setUpdatingContactId(contact.id);
            setUpdateContactError("");

            await updateContactActive(contact, token);

            setContacts(prevContacts =>
                prevContacts.map(item =>
                    item.id === contact.id
                        ? { ...item, active: !item.active }
                        : item
                )
            );
        } catch (error) {
            console.error("Contactstatus wijzigen mislukt:", error);
            setUpdateContactError("Het wijzigen van de contactstatus is mislukt.");
        } finally {
            setUpdatingContactId(null);
        }
    }

    async function deleteContact(contactId) {
        if (!window.confirm("Weet je zeker dat je dit contact wilt verwijderen?"))
            return;

        try {
            setDeletingContactId(contactId);
            setDeleteContactError("");
            for (const horse of horses) {
                if (
                    Number(horse.ownerId) === Number(contactId) ||
                    Number(horse.caretakerId) === Number(contactId) ||
                    Number(horse.trainerId) === Number(contactId)
                ) {
                    await updateHorseRelations(
                        horse.id,
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
                        token
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

            await deleteContactFromApi(contactId, token);

            setContacts(previousContacts =>
                previousContacts.filter(contact => contact.id !== contactId)
            );

        } catch (error) {
            console.error("Contact verwijderen mislukt:", error);
            setDeleteContactError("Het verwijderen van het contact is mislukt.");
        } finally {
            setDeletingContactId(null);
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
            {deleteContactError && (
                <p className="error-message">{deleteContactError}</p>
            )}
            {updateContactError && (
                <p className="error-message">{updateContactError}</p>
            )}
            {isLoadingHorses && <p>Paarden worden geladen...</p>}

            {horsesError && (
                <p className="error-message">{horsesError}</p>
            )}

            {selectedContact ? (
                <>
                    <Button
                        type="button"
                        onClick={() => navigate('/contacten')}
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

                    {isLoadingContacts && <p>Contacten worden geladen...</p>}

                    {contactsError && (
                        <p className="error-message">{contactsError}</p>
                    )}

                    {contactId &&
                        !selectedContact &&
                        !isLoadingContacts &&
                        !contactsError && (
                            <div className="contact-detail-empty-state">
                                <h2>Contact niet gevonden</h2>
                                <p>
                                    Het contact dat je zoekt bestaat niet of is niet beschikbaar.
                                </p>
                            </div>
                        )
                    }

                    {!isLoadingContacts && !contactsError && contacts.length === 0 ? (
                        <p>Er zijn nog geen contacten beschikbaar.</p>
                    ) : (
                        !isLoadingContacts &&
                        !contactsError && (
                            <ContactTable
                                contacts={sortedContacts}
                                deleteContact={deleteContact}
                                toggleContactActive={toggleContactActive}
                                updatingContactId={updatingContactId}
                                deletingContactId={deletingContactId}
                            />
                        )
                    )}

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