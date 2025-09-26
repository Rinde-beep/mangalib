import React from 'react';

const RatingStars = ({ rating, maxRating = 10 }) => {
    const percentage = (rating / maxRating) * 100;

    return (
        <div className="hero__ratingbigstars">
                <span className="hero__ratingscore">
                    <span style={{ width: `${percentage}%` }}></span>
                </span>
                <span>{rating.toFixed(1)}</span>
        </div>
    );
};

export default RatingStars;