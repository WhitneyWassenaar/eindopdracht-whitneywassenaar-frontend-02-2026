// Components
import Button from '../../../ui/Button/Button.jsx';

// Assets
import deleteIcon from '/src/assets/delete-icon.png';

// CSS
import './ContactRow.css';

const defaultContactPhoto = "/defaultContactPhoto.png";

function ContactRow({
                        contact,
                        setSelectedContact,
                        deleteContact,
                        toggleContactActive,
                        updatingContactId,
                        deletingContactId
                    }) {
    return (
        <tr className="contactrow-layout"
            onClick={() => setSelectedContact(contact)}>
            <td>
                <img
                    src={contact.photo || defaultContactPhoto}
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className="contact-photo"
                    onError={(e) => {
                        e.target.src = defaultContactPhoto;
                    }}
                />
            </td>

            <td>
                {contact.firstName} {contact.lastName}
            </td>

            <td>
                {contact.email}
            </td>

            <td>
                {contact.phone}
            </td>

            <td>
                {contact.role}
            </td>
            <td
                className={contact.active ? "contact-status active" : "contact-status inactive"}
                onClick={(e) => {
                    e.stopPropagation();
                    if (updatingContactId === contact.id) return;
                    toggleContactActive(contact);
                }}
            >
                {updatingContactId === contact.id
                    ? "Bezig met wijzigen..."
                    : contact.active
                        ? "Actief"
                        : "Inactief"}
            </td>

            <td>
                <Button
                    type="button"
                    variant="delete"
                    disabled={deletingContactId === contact.id}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (deletingContactId === contact.id) return;

                        deleteContact(contact.id);
                    }}
                >
                    {deletingContactId === contact.id
                        ? "Bezig met verwijderen..."
                        : <img src={deleteIcon} alt="delete icon" />
                    }
                </Button>
            </td>
        </tr>
    );
}

export default ContactRow;