// CSS
import './ReviewCard.css';

function ReviewCard({
                        profileImgUrl,
                        profileImgAlt,
                        personName,
                        stableName,
                        reviewText}) {
    return (
        <div className="review-card">
            <div className="avatarAndName">
                <img src={profileImgUrl} alt={profileImgAlt} />
                <div className="nameAndStableName">
                    <h4>{personName}</h4>
                    <h5>{stableName}</h5>
                </div>
            </div>
            <p>{reviewText}</p>
        </div>
    );
}

export default ReviewCard;