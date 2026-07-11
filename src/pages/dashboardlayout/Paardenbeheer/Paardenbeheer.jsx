import './Paardenbeheer.css'
import Button from "../../../components/ui/Button/Button.jsx";
import HorseTable from "../../../components/page-components/paardenbeheer/HorseTable/HorseTable.jsx";
import CreateHorseProfileForm from "../../../components/forms/CreateHorseProfileForm/CreateHorseProfileForm.jsx";
import HorseDetailTabs from "../../../components/page-components/paardenbeheer/HorseDetailTabs/HorseDetailTabs.jsx";
import HorseDetailMainInfo
    from "../../../components/page-components/paardenbeheer/HorseDetailMainInfo/HorseDetailMainInfo.jsx";

function Paardenbeheer() {
    const horses = [
        {
            id: 1,
            photo: "daisy.jpg",
            name: "Daisy",
            gender: "Merrie",
            age: "6 jaar",
            owner: "Mirjam Haas",
            status: "Inactief"
        },
        {
            id: 2,
            photo: "xanthos.jpg",
            name: "Xanthos",
            gender: "Ruin",
            age: "4 jaar",
            owner: "Dennis Schulten",
            status: "Actief"
        }
    ];

    return (
        <>
            <div className="paardenbeheer-page">
                <h1>Paardenbeheer</h1>
                <p>
                    Totaal aantal paardenprofielen: <strong>{horses.length}</strong>
                </p>

                <div className="paardenbeheer-actions">
                    <Button variant={"filter-sort"}>Filter</Button>
                    <Button variant={"filter-sort"}>Sorteren</Button>

                </div>

                <HorseTable horses={horses}/>

                <Button>Paardenprofiel toevoegen</Button>

                <CreateHorseProfileForm/>
                <HorseDetailMainInfo/>
                <HorseDetailTabs/>

            </div>
        </>
    )
}

export default Paardenbeheer;

//TODO:
// horse table
// horse row
// filter
// sort
// Op deze pagina <CreateHorseProfileForm /> testen