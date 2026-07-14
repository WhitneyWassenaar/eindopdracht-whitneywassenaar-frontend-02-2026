import Button from '../../../ui/Button/Button.jsx';
import calculateAge from '../../../../helpers/calculateAge.jsx';

import deleteIcon from '/src/assets/delete-icon.png'

import './HorseRow.css'

function HorseRow({horse, setSelectedHorse, deleteHorse,toggleHorseActive, contacts}) {

    const defaultHorsePhoto = "/defaultHorsePhoto.png";
    const owner = contacts.find(
        contact => Number(contact.id) === Number(horse.ownerId)
    );

    return (
        <tr className="horserow-layout"
            onClick={() => setSelectedHorse(horse)}>
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
                    toggleHorseActive(horse);
                }}
                >
                {horse.active ? "Actief" : "Inactief"}
            </td>

            <td>
                <Button
                    type={"button"}
                    variant={"delete"}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteHorse(horse.id);
                    }}>
                    <img src={deleteIcon} alt={"delete icon"}/>
                </Button>
            </td>
        </tr>
    );
}

export default HorseRow;