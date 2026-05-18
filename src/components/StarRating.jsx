import { useState } from 'react';

export default function StarRating({ note, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(null);

  const display = hovered !== null ? hovered : note;
  const full = Math.floor(display);
  const partial = display - full;

  const handleClick = (val) => {
    if (interactive && onRate) onRate(val);
  };

  return (
    <div className="star-rating" aria-label={`Note: ${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        let fill = 'empty';
        if (i <= full) fill = 'full';
        else if (i === full + 1 && partial >= 0.5) fill = 'half';

        return (
          <span
            key={i}
            className={`star star--${fill} ${interactive ? 'star--interactive' : ''}`}
            onClick={() => handleClick(i)}
            onMouseEnter={() => interactive && setHovered(i)}
            onMouseLeave={() => interactive && setHovered(null)}
          >
            {fill === 'half' ? '½' : '★'}
          </span>
        );
      })}
      <span className="star-value">{note.toFixed(1)}</span>
    </div>
  );
}
