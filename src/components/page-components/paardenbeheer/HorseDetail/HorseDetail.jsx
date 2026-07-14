import HorseDetailMainInfo from '../HorseDetailMainInfo/HorseDetailMainInfo.jsx';
import './HorseDetail.css';
import HorseDetailTabs from "../HorseDetailTabs/HorseDetailTabs.jsx";
import {useState} from "react";
import Button from "../../../ui/Button/Button.jsx";
import HorseRelationsForm from "../../../forms/HorseRelationsForm/HorserelationsForm.jsx";

function HorseDetail({horse,contacts}) {
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
                    contacts={contacts}
                />
            )}
            <HorseDetailTabs />
        </div>
    );
}

export default HorseDetail;