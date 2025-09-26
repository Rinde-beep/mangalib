import React from 'react';

const ListStats = ({ lists }) => {
    if (!lists) return null;

    // Предположим, что у тебя есть данные о списках в таком формате:
    // lists: { reading: 100, planned: 50, completed: 200, ... }
    const total = Object.values(lists).reduce((sum, count) => sum + count, 0);

    const listTypes = [
        { id: 'reading', name: 'Читают', class: 'reading' },
        { id: 'planned', name: 'В планах', class: 'planned' },
        { id: 'completed', name: 'Прочитано', class: 'completed' },
        { id: 'favorite', name: 'Любимое', class: 'favorite' },
        { id: 'on_hold', name: 'Отложено', class: 'on-hold' },
        { id: 'dropped', name: 'Брошено', class: 'dropped' }
    ];

    return (
        <div className="hero__stats">
            <div className="hero__statstop">
                <span className="hero__statstitle">В списках</span>
            </div>
            
            <div className="lists-distribution">
                {listTypes.map(list => {
                    const count = lists[list.id] || 0;
                    const percentage = total > 0 ? (count / total * 100) : 0;

                    return (
                        <div key={list.id} className="hero__statsrow">
                            <div className="hero__listname">{list.name}</div>
                            <div className="hero__listprogress">
                                <div 
                                    className={`hero__listfill ${list.class}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <div className="hero__listcount">
                                {count.toLocaleString()}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListStats;