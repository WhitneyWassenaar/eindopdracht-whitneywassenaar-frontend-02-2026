// Components
import ContactRow from "../ContactRow/ContactRow.jsx";

// CSS
import './ContactTable.css';

function ContactTable({
                          contacts = [],
                          setSelectedContact,
                          deleteContact,
                          toggleContactActive,
                      updatingContactId,
                      deletingContactId}) {
    return (
        <table className="contact-table-layout">
            <thead>
            <tr>
                <th>Foto</th>
                <th>Naam</th>
                <th>Email</th>
                <th>Telefoonnummer</th>
                <th>Rol</th>
                <th>Status</th>
                <th>Acties</th>
            </tr>
            </thead>

            <tbody>
            {contacts.map((contact) => (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    setSelectedContact={setSelectedContact}
                    deleteContact={deleteContact}
                    toggleContactActive={toggleContactActive}
                    updatingContactId={updatingContactId}
                    deletingContactId={deletingContactId}
                />
            ))}
            </tbody>
        </table>
    );
}

export default ContactTable;