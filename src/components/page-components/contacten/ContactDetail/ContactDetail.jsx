// Components
import ContactDetailMainInfo from "../ContactDetailMainInfo/ContactDetailMainInfo.jsx";

// CSS
import './ContactDetail.css';

function ContactDetail({contact, horses = []}) {

    const contactId = Number(contact.id);

    const relatedHorses = horses.filter(horse =>
        Number(horse.ownerId) === contactId ||
        Number(horse.caretakerId) === contactId ||
        Number(horse.trainerId) === contactId
    );

    return (
        <div className="contact-detail-container">
            <ContactDetailMainInfo
                contact={contact}
                horses={relatedHorses}
            />
        </div>

    );
}

export default ContactDetail;