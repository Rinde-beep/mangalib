import React from 'react';

const RatingStats = ({ ratings }) => {
    if (!ratings) return null;

    // Вычисляем общее количество оценок
    const totalVotes = ratings.rating_10 + ratings.rating_9 + ratings.rating_8 + 
                      ratings.rating_7 + ratings.rating_6 + ratings.rating_5 + 
                      ratings.rating_4 + ratings.rating_3 + ratings.rating_2 + ratings.rating_1;

    // Группируем оценки как в оригинальном коде
    const distribution = {
        'nine-ten': ratings.rating_10 + ratings.rating_9,
        'seven-eight': ratings.rating_8 + ratings.rating_7,
        'five-six': ratings.rating_6 + ratings.rating_5,
        'three-four': ratings.rating_4 + ratings.rating_3,
        'one-two': ratings.rating_2 + ratings.rating_1
    };

    const listStars = [
        { id: 'nine-ten', name: '9-10', class: 'ten' },
        { id: 'seven-eight', name: '7-8', class: 'eight' },
        { id: 'five-six', name: '5-6', class: 'six' },
        { id: 'three-four', name: '3-4', class: 'three' },
        { id: 'one-two', name: '1-2', class: 'one' },
    ];

    return (
        <div className="hero__stats">
            <div className="hero__statstop">
                <span className="hero__statstitle">Оценки</span>
                <div className="hero__rating">
                    <span>{ratings.rating?.toFixed(2) || '0.00'}</span>
                    <span>/10</span>
                </div>
            </div>
            
            <div className="ratings-distribution">
                {listStars.map(list => {
                    const count = distribution[list.id] || 0;
                    const percentage = totalVotes > 0 ? (count / totalVotes * 100) : 0;
                    console.log(count, totalVotes)
                    

                    return (
                        <div key={list.id} className="hero__statsrow">
                            <div className="hero__ratingstars">
                                <span>{list.name}</span>
                            </div>
                            <div className="hero__ratingprogress">
                                
                                <div 
                                    className={`hero__ratingfill ${list.class}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <div className="hero__ratingcount">
                                {count.toLocaleString()}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="hero__statsfoot">
                <span>Всего оценок:</span>
                <span>{totalVotes.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default RatingStats;