import "./ReviewCard.css";

function ReviewCard({profileImgUrl,profileImgAlt,personName,stableName,reviewText}) {
    return (
        <div className="">
            <img src={profileImgUrl} alt={profileImgAlt} />
            <h4>{personName}</h4>
            <h5>{stableName}</h5>
            <p>{reviewText}</p>
        </div>
    );
}

export default ReviewCard;
/*
* TODO:
*  - Class maken voor:
*  - Div van ReviewCard
*/
