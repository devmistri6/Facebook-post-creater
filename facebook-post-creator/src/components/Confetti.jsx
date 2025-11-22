import React from 'react';

const Confetti = ({ confetti }) => {
  return (
    <>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}vw`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`
          }}
        />
      ))}
    </>
  );
};

export default Confetti;