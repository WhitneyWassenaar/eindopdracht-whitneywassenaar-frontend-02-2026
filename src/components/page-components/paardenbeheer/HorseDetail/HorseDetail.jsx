// React
import {useState} from "react";

// Components
import Button from "../../../ui/Button/Button.jsx";
import HorseDetailMainInfo from '../HorseDetailMainInfo/HorseDetailMainInfo.jsx';
import HorseRelationsForm from "../../../forms/HorseRelationsForm/HorserelationsForm.jsx";
import HorseDetailTabs from "../HorseDetailTabs/HorseDetailTabs.jsx";

// CSS
import './HorseDetail.css';

function HorseDetail({horse, contacts, setHorses, setSelectedHorse}) {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="horse-detail-container">
            <HorseDetailMainInfo
                horse={horse}
                contacts={contacts}
            />

            <Button
                onClick={() => setShowForm(!showForm)}
                variant="manage-relations"
            >
                Relaties beheren
            </Button>

            {showForm && (
                <HorseRelationsForm
                    key={horse.id}
                    contacts={contacts}
                    horse={horse}
                    setHorses={setHorses}
                    setSelectedHorse={setSelectedHorse}
                />
            )}
            <HorseDetailTabs/>
        </div>
    );
}

export default HorseDetail;