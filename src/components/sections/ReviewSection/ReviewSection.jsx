import ReviewCard from '../../cards/ReviewCard/ReviewCard.jsx';

import reviewer1 from '../../../assets/home/reviewer1.jpg';
import reviewer2 from '../../../assets/home/reviewer2.jpg';
import reviewer3 from '../../../assets/home/reviewer3.jpg';

import './ReviewSection.css';

function ReviewSection() {
    return (
        <section className="review-section">
            <ReviewCard
                profileImgUrl={reviewer1}
                profileImgAlt={"Profile picture from the reviewer Justin van Dam"}
                personName={"Justin van dam"}
                stableName={"Stal Horse Paradise"}
                reviewText={"Ik heb veel meer rust en overzicht met alles wat te maken heeft met management, paarden en stal. "}
            />

            <ReviewCard
                profileImgUrl={reviewer2}
                profileImgAlt={"Profile picture from the reviewer mario Hoeven"}
                personName={"Mario Hoeven"}
                stableName={"Stal Vrijheidshoeve"}
                reviewText={"EquiManager zorgt er voor dat ik alle taken makkelijk kan bijhouden. Ik ben er super blij mee!"}
            />

            <ReviewCard
                profileImgUrl={reviewer3}
                profileImgAlt={"Profile picture from the reviewer Elise de Jong"}
                personName={"Elise de Jong"}
                stableName={"Stal de Friezenbende"}
                reviewText={"Ik kan niet meer zonder EquiManager.  Ik bespaar tijd en stress door deze fantastische applicatie. Ik raad het zeker aan!"}
            />
        </section>
    );
}

export default ReviewSection;