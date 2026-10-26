// Components
import ContactDetailMainInfo from "../ContactDetailMainInfo/ContactDetailMainInfo.jsx";

// CSS
import './ContactDetail.css';

function ContactDetail({contact, horses = []}) {

    const relatedHorses = horses.filter((horse) =>
        Number(horse.ownerId) === Number(contact.id) ||
        Number(horse.caretakerId) === Number(contact.id) ||
        Number(horse.trainerId) === Number(contact.id));

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