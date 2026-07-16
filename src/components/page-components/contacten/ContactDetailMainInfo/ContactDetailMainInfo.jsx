// CSS
import './ContactDetailMainInfo.css';

function ContactDetailMainInfo({contact, horses = []}) {
    const defaultContactPhoto = "/defaultContactPhoto.png";

    return (
        <div className="contact-detail-main-info-container">
            <div className="contact-profile-picture">
                <img src={contact.photo || defaultContactPhoto} alt={`${contact.firstName} ${contact.lastName}`}/>
            </div>

            <div className="contact-main-info">
                <div className="info-block">
                    <h2>{contact.firstName} {contact.lastName}</h2>
                    <ul>
                        <li>Email: {contact.email}</li>
                        <li>Telefoonnummer: {contact.phone}</li>
                        <li>Rol: {contact.role}</li>
                    </ul>
                </div>

                <div className="info-block">
                    <h4>Relaties</h4>
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