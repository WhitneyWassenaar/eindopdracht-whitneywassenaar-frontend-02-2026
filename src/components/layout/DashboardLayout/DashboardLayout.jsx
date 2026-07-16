// React
import {Outlet} from 'react-router-dom';

// Components
import UserNavbar from '../../navigation/UserNavbar/UserNavbar.jsx';

// CSS
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
    );
}

export default DashboardLayout;