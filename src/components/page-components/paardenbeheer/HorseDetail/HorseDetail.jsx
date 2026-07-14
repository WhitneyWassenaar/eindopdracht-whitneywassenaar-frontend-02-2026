import HorseDetailMainInfo from '../HorseDetailMainInfo/HorseDetailMainInfo.jsx';
import HorseDetailTabs from '../HorseDetailTabs/HorseDetailTabs.jsx';

import './HorseDetail.css';

function HorseDetail({horse,contacts}) {
    console.log("HorseDetail:", horse);
    return (
        <div className="horse-detail-container">
            <HorseDetailMainInfo
                horse={horse}
                contacts={contacts}
            />
            <HorseDetailTabs horse={horse}/>
        </div>

    );
}

export default HorseDetail;