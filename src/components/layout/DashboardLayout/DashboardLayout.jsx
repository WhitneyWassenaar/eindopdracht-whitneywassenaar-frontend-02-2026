import {Outlet} from 'react-router-dom';

import UserNavbar from '../../navigation/UserNavbar/UserNavbar.jsx';

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