import {useState} from "react"
import Button from "../../../ui/Button/Button.jsx";
import "./HorseDetailTabs.css"
function HorseDetailTabs() {
    const [activeTab,setActiveTab]= useState("1")
    return (
        <div>
            <div>
                <Button onClick={()=> setActiveTab("1")}>Tab 1</Button>
                <Button onClick={()=> setActiveTab("2")}>Tab 2</Button>
                <Button onClick={()=> setActiveTab("3")}>Tab 3</Button>
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
    )
}

export  default <HorseDetailTabs>

</HorseDetailTabs>