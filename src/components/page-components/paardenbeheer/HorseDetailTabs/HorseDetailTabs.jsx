import {useState} from 'react';

import Button from '../../../ui/Button/Button.jsx';

import './HorseDetailTabs.css';

function HorseDetailTabs() {
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
                        Tab 1 content
                    </div>
                )}

                {activeTab === "2" && (
                    <div id="2">
                        Tab 2 content
                    </div>
                )}

                {activeTab === "3" && (
                    <div id="3">
                        Tab 3 content
                    </div>
                )}
            </div>
        </div>
    );
}

export default HorseDetailTabs;