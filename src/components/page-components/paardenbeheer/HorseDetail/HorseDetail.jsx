import HorseDetailMainInfo from "../HorseDetailMainInfo/HorseDetailMainInfo.jsx";
import HorseDetailTabs from "../HorseDetailTabs/HorseDetailTabs.jsx";
import "./HorseDetail.css";

function HorseDetail({horse}) {
    console.log("HorseDetail:", horse);
    return (
        <div className="horse-detail-container">
            <HorseDetailMainInfo horse={horse} />
            <HorseDetailTabs horse={horse} />
        </div>

    );
}

export default HorseDetail;