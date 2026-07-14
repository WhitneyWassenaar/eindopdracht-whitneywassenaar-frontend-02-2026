import './ContactDetail.css';
import ContactDetailMainInfo from "../ContactDetailMainInfo/ContactDetailMainInfo.jsx";

function ContactDetail({contact}) {
    console.log("ContactDetail:", contact);
    return (
        <div className="contact-detail-container">
            <ContactDetailMainInfo contact={contact}/>
        </div>

    );
}

export default ContactDetail;