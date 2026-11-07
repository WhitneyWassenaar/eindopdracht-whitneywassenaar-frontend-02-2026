// CSS
import './ContactDetailMainInfo.css';

const defaultContactPhoto = "/defaultContactPhoto.png";

function ContactDetailMainInfo({contact, horses = []}) {

    return (
        <div className="contact-detail-main-info-container">
            <div className="contact-profile-picture">
                <img src={contact.photo || defaultContactPhoto} alt={`${contact.firstName} ${contact.lastName}`}/>
            </div>

            <div className="contact-main-info">
                <div className="contact-info-block">
                    <h2>{contact.firstName} {contact.lastName}</h2>
                    <ul>
                        <li>
                            <span className="contact-info-label">Email</span> {contact.email}
                        </li>
                        <li>
                            <span className="contact-info-label">Telefoonnummer</span> {contact.phone}
                        </li>
                        <li>
                            <span className="contact-info-label">Rol</span> {contact.role}
                        </li>
                    </ul>
                </div>

                <div className="contact-info-block">
                    <h3>Relaties</h3>
                    {horses.length > 0 ? (
                        horses.map((horse) => (
                            <div key={horse.id} className="related-horse">
                                {horse.name}
                            </div>
                        ))
                    ) : (
                        <p>Geen gekoppelde paarden</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactDetailMainInfo;