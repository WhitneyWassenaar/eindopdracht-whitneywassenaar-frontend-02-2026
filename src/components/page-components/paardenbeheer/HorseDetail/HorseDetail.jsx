import HorseDetailMainInfo from '../HorseDetailMainInfo/HorseDetailMainInfo.jsx';

import './HorseDetail.css';
import HorseDetailTabs from "../HorseDetailTabs/HorseDetailTabs.jsx";

function HorseDetail({horse,contacts}) {
    console.log("HorseDetail:", horse);
    return (
        <div className="horse-detail-container">
            <HorseDetailMainInfo
                horse={horse}
                contacts={contacts}
            />
            <HorseDetailTabs />
        </div>
    );
}

export default HorseDetail;