import React, { useState } from 'react';
import './FilterModal.css';

const FilterModal = ({ isOpen, onClose, onApply, genres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [excludedGenres, setExcludedGenres] = useState([]);

  const handleGenreToggle = (genreId, isExcluded = false) => {
    if (isExcluded) {
      setExcludedGenres(prev =>
        prev.includes(genreId)
          ? prev.filter(id => id !== genreId)
          : [...prev, genreId]
      );
    } else {
      setSelectedGenres(prev =>
        prev.includes(genreId)
          ? prev.filter(id => id !== genreId)
          : [...prev, genreId]
      );
    }
  };

  const handleApply = () => {
    onApply({
      genres: selectedGenres,
      excludeGenres: excludedGenres
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setExcludedGenres([]);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Фильтр по жанрам</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="genres-section">
            <h4>Включенные жанры</h4>
            <div className="genres-grid">
              {genres.map(genre => (
                <label key={genre.id} className="genre-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
                  />
                  <span>{genre.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="genres-section">
            <h4>Исключенные жанры</h4>
            <div className="genres-grid">
              {genres.map(genre => (
                <label key={genre.id} className="genre-checkbox">
                  <input
                    type="checkbox"
                    checked={excludedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id, true)}
                  />
                  <span>{genre.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn catalog__btns" onClick={handleReset}>
            Сбросить
          </button>
          <button className="btn catalog__btns" onClick={handleApply}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;