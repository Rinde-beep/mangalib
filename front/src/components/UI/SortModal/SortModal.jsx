import React, { useState } from 'react';
import './SortModal.css';

const SortModal = ({ isOpen, onClose, onApply, currentSort }) => {
  const [selectedSort, setSelectedSort] = useState(currentSort?.field || '');
  const [sortOrder, setSortOrder] = useState(currentSort?.order || "false");

  const sortOptions = [
    { value: 'rating', label: 'Рейтинг' },
    { value: 'chapters', label: 'Количество глав' },
    { value: 'volumes', label: 'Количество томов' },
    { value: 'id', label: 'По новизне' }
  ];

  const handleApply = () => {
    if (selectedSort) {
      onApply({
        field: selectedSort,
        order: sortOrder
      });
    }
    onClose();
  };

  const handleReset = () => {
    setSelectedSort('');
    setSortOrder("false");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sort-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Сортировка</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="sort-options">
            {sortOptions.map(option => (
              <label key={option.value} className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={selectedSort === option.value}
                  onChange={(e) => setSelectedSort(e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <div className="order-options">
            <label className="order-option">
              <input
                type="radio"
                name="order"
                value="false"
                checked={sortOrder === 'false'}
                onChange={(e) => setSortOrder(e.target.value)}
              />
              <span>По возрастанию</span>
            </label>
            <label className="order-option">
              <input
                type="radio"
                name="order"
                value="true"
                checked={sortOrder === 'true'}
                onChange={(e) => setSortOrder(e.target.value)}
              />
              <span>По убыванию</span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn catalog__btns" onClick={handleReset}>
            Сбросить
          </button>
          <button type='button'
            className="btn catalog__btns" 
            onClick={handleApply}
            disabled={!selectedSort}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;