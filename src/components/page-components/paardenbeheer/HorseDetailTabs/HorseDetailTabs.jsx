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
        <section>
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

            <div className="tab-content">
                {activeTab === "1" && (
                    <HorseHealth
                        horse={horse}
                    />
                )}

                {activeTab === "2" && (
                    <HorseCareTasks
                        horse={horse}
                    />
                )}

                {activeTab === "3" && (
                    <HorseAppointments
                        horse={horse}
                    />
                )}
            </div>
        </section>
    );
}

export default HorseDetailTabs;