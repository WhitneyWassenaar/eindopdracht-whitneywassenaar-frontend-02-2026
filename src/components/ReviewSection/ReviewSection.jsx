import "./ReviewSection.css";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";

function ReviewSection() {
    return (
        <section className="/">
            <ReviewCard
                profileImgUrl={"/"}
                profileImgAlt={"/"}
                personName={"Justin van dam"}
                stableName={"Stal Horse Paradise"}
                reviewText={"Ik heb veel meer rust en overzicht met alles wat te maken heeft met management, paarden en stal. "}
            />

            <ReviewCard
                profileImgUrl={"/"}
                profileImgAlt={"/"}
                personName={"Mario Hoeven"}
                stableName={"Stal Vrijheidshoeve"}
                reviewText={"EquiManager zorgt er voor dat ik alle taken makkelijk kan bijhouden. Ik ben er super blij mee!"}
            />

            <ReviewCard
                profileImgUrl={"/"}
                profileImgAlt={"/"}
                personName={"Elise de Jong"}
                stableName={"Stal de Friezenbende"}
                reviewText={"Ik kan niet meer zonder EquiManager.  Ik bespaar tijd en stress door deze fantastische applicatie. Ik raad het zeker aan!"}
            />
        </section>
    );
}

export default ReviewSection;

/*
* TODO:
*  - Class maken voor:
*  - section
*/