// React
// Components

// CSS
import './Stalbezetting.css'
import StableTable from "../../../components/page-components/stalbezetting/StableTable/StableTable.jsx";


function Stalbezetting({boxes}) {

    return (
        <>
            <div className="stalbezetting-page">
                <h1>Stalbezetting</h1>

                <StableTable
                boxes={boxes}/>
            </div>
        </>
    );
}

export default Stalbezetting;