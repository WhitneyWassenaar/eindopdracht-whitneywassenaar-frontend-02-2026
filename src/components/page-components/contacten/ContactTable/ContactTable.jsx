import './ContactTable.css'
import ContactRow from "../ContactRow/ContactRow.jsx";

function ContactTable({  contacts,
                          setSelectedContact,
                          deleteContact,
                          toggleContactActive}) {
    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Foto</th>
                <th>Naam</th>
                <th>Email</th>
                <th>Telefoonnummer</th>
                <th>Rol</th>
                <th>Status</th>
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
                />
            ))}
            </tbody>
        </table>
    );
}

export default ContactTable;