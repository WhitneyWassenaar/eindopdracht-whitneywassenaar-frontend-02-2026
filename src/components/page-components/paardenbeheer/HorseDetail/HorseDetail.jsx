// Components

import HorseDetailMainInfo from '../HorseDetailMainInfo/HorseDetailMainInfo.jsx';

import HorseDetailTabs from "../HorseDetailTabs/HorseDetailTabs.jsx";

// CSS
import './HorseDetail.css';

function HorseDetail({horse, contacts, setHorses, setSelectedHorse}) {
    console.log("HorseDetail wordt weergegeven");
    return (
        <div className="horse-detail-container">
            <HorseDetailMainInfo
                horse={horse}
                contacts={contacts}
            />
            <div className="relation-and-tabs-container">

                <HorseDetailTabs
                    horse={horse}
                    contacts={contacts}
                    setHorses={setHorses}
                    setSelectedHorse={setSelectedHorse}/>
            </div>

        </div>
    );
}

export default HorseDetail;