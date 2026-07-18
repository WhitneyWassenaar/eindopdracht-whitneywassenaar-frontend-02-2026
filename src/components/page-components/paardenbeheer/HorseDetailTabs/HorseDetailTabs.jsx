// React
import {useState} from 'react';
// Components
import Button from '../../../ui/Button/Button.jsx';
import HorseCareTasks from "../../zorgtaken/HorseCareTasks/HorseCareTasks.jsx";
import HorseHealth from "../HorseHealth/HorseHealth.jsx";

// CSS
import './HorseDetailTabs.css';
import HorseAppointments from "../HorseAppointments/HorseAppointments.jsx";

function HorseDetailTabs({horse}) {
    const [activeTab, setActiveTab] = useState("1")
    return (
        <div>
            <div>
                <Button
                    variant={"tab"}
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                >
                    Gezondheid
                </Button>

                <Button
                    variant={"tab"}
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => setActiveTab("2")}
                >
                    Zorgtaken
                </Button>

                <Button
                    variant={"tab"}
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => setActiveTab("3")}
                >
                    Afspraken
                </Button>
            </div>

            <div className="tab-content">
                {activeTab === "1" && (
                    <div id="1">
                       <HorseHealth
                           horse={horse}/>
                    </div>
                )}

                {activeTab === "2" && (
                    <div id="2">
                       <HorseCareTasks
                       horse={horse}/>
                    </div>
                )}

                {activeTab === "3" && (
                    <div id="3">
                        <HorseAppointments
                        horse={horse}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HorseDetailTabs;