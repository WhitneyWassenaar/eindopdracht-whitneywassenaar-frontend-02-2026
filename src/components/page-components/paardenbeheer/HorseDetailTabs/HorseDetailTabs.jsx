// React
import {useState} from 'react';
// Components
import Button from '../../../ui/Button/Button.jsx';
import HorseCareTasks from "../../zorgtaken/HorseCareTasks/HorseCareTasks.jsx";
import HorseHealth from "../HorseHealth/HorseHealth.jsx";

// CSS
import './HorseDetailTabs.css';
import HorseAppointments from "../HorseAppointments/HorseAppointments.jsx";
import HorseRelationsForm from "../../../forms/HorseRelationsForm/HorserelationsForm.jsx";

function HorseDetailTabs({horse, contacts, setHorses, setSelectedHorse}) {

    const [activeTab, setActiveTab] = useState("1");

    return (
        <section className="horse-detail-tabs-container">
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

            <Button
                variant={"tab"}
                className={activeTab === "4" ? "active" : ""}
                onClick={() => setActiveTab("4")}
            >
                Relaties beheren
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

                {activeTab === "4" && (
                    <HorseRelationsForm
                        key={horse.id}
                        contacts={contacts}
                        horse={horse}
                        setHorses={setHorses}
                        setSelectedHorse={setSelectedHorse}
                    />
                )}


            </div>
        </section>
    );
}

export default HorseDetailTabs;