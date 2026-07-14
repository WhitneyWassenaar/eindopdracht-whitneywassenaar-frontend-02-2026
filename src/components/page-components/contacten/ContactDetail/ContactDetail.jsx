import './ContactDetail.css';
import ContactDetailMainInfo from "../ContactDetailMainInfo/ContactDetailMainInfo.jsx";
import {getHorses} from "../../../../data/horseApi.js";

function ContactDetail({contact}) {
    console.log("ContactDetail:", contact);

    const relatedHorses = getHorses.filter((horseDetail) =>
    horseDetail.ownerId === contact.id ||
    horseDetail.careTakerId === contact.id ||
    horseDetail.trainerId === contact.id);

    return (
        <div className="contact-detail-container">
            <ContactDetailMainInfo
                contact={contact}
                horses = {[]}
            />
        </div>

    );
}

export default ContactDetail;