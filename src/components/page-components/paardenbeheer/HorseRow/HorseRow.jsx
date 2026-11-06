// React
import Button from '../../../ui/Button/Button.jsx';

// React Router
import { useNavigate } from 'react-router-dom';

// Helpers
import calculateAge from '../../../../helpers/calculateAge.jsx';

// Assets
import deleteIcon from '/src/assets/delete-icon.png'

// CSS
import './HorseRow.css'

const defaultHorsePhoto = "/defaultHorsePhoto.png";

function HorseRow({horse, deleteHorse,toggleHorseActive, contacts = [],   updatingHorseId,   deletingHorseId}) {
    const navigate = useNavigate();

    const owner = contacts.find(
        contact => Number(contact.id) === Number(horse.ownerId)
    );

    return (
        <tr className="horse-row-layout"
            onClick={() => navigate(`/paardenbeheer/${horse.id}`)
        }>
            <td>
                <img
                    src={horse.photo || defaultHorsePhoto}
                    alt={horse.name}
                    className="horse-photo"
                    onError={(e) => {
                        e.target.src = defaultHorsePhoto;
                    }}
                />
            </td>

            <td>{horse.name}</td>
            <td>{horse.gender}</td>
            <td>{calculateAge(horse.birthDate)} jaar</td>
            <td>{owner ? `${owner.firstName} ${owner.lastName}` : "Eigenaar onbekend"}</td>
            <td
                className={horse.active ? "horse-status active" : "horse-status inactive"}
                onClick={(e) => {
                    e.stopPropagation();
                    if (updatingHorseId === horse.id) return;
                    toggleHorseActive(horse);
                }}
                >
                {updatingHorseId === horse.id
                    ? "Bezig met wijzigen..."
                    : horse.active
                        ? "Actief"
                        : "Inactief"}
            </td>

            <td>
                <Button
                    type="button"
                    variant="delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteHorse(horse.id);
                    }}
                    disabled={deletingHorseId === horse.id}>
                    {deletingHorseId === horse.id
                        ? "Bezig met verwijderen..."
                        : <img src={deleteIcon} alt="Verwijderen" />}
                </Button>
            </td>
        </tr>
    );
}

export default HorseRow;