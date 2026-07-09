import './Dashboard.css'

function Dashboard() {
    return (
        <>
            <div className="dashboard-page">
                <h1>Welkom naam</h1>

                <div>
                    <h2>Paardenverdeling</h2>
                    <p>
                        <ul>
                            <li>capacitieit:</li>
                            <li>paarden op stal:</li>
                            <li> paarden op de wei:</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <h2>Zorgtaken</h2>
                    <p>
                        <ul>
                            <li>urgent:</li>
                            <li>vandaag:</li>
                            <li>gepland:</li>
                        </ul>
                        [knop bekijk alle zorgtaken]
                    </p>
                </div>

                <div>
                    <h2>Afspraken</h2>
                    <p>
                        <ul>
                            <li>aankomende afspraken:</li>
                            <li>behandelingen:</li>
                            <li>trainingen:</li>
                        </ul>

                        [knop bekijk alle afspraken]

                    </p>
                </div>
            </div>
        </>
    )
}

export default Dashboard;

//TODO:
// componenten maken