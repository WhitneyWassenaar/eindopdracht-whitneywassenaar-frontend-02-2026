import UserNavbar from "../../navigation/UserNavbar/UserNavbar.jsx";
import {Outlet} from "react-router-dom";
import './DashboardLayout.css'

function DashboardLayout() {
    return (
        <>
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <UserNavbar/>
                </aside>

                <main className="dashboard-content">

<Outlet/>

                </main>
            </div>


        </>
    )
}

export default DashboardLayout;

// sidebar werkent maken en verer gaan met dashbaord