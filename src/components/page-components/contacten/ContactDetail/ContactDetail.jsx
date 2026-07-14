import './ContactDetail.css';
import ContactDetailMainInfo from "../ContactDetailMainInfo/ContactDetailMainInfo.jsx";

function ContactDetail({contact,horses}) {
    console.log("ContactDetail:", contact);

    const relatedHorses = horses.filter((horse) =>
    horse.ownerId === contact.id ||
    horse.careTakerId === contact.id ||
    horse.trainerId === contact.id);

    return (
        <div className="contact-detail-container">
            <ContactDetailMainInfo
                contact={contact}
                horses = {relatedHorses}
            />
        </div>

    );
}

export default ContactDetail;