import Button from '../../../ui/Button/Button.jsx';

import deleteIcon from '/src/assets/delete-icon.png'

import './ContactRow.css'

function ContactRow({
                        contact,
                        setSelectedContact,
                        deleteContact,
                        toggleContactActive
                    }) {

    const defaultContactPhoto = "/defaultContactPhoto.png";
    console.log(contact)
    return (
        <tr className="contactrow-layout"
            onClick={() => setSelectedContact(contact)}>
            <td>
                <img
                    src={contact.photo || defaultContactPhoto}
                    alt={contact.name}
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
                    toggleContactActive(contact);
                }}
            >
                {contact.active ? "Actief" : "Inactief"}
            </td>

            <td>
                <Button
                    type={"button"}
                    variant={"delete"}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteContact(contact.id);
                    }}>
                    <img src={deleteIcon} alt={"delete icon"}/>
                </Button>
            </td>
        </tr>
    );
}

export default ContactRow;