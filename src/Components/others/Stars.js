const Stars = () => {
  const stars = Array.from({ length: 100 }, () => ({
    size: Math.random() * 3 + 1,
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    opacity: Math.random(),
  }));

  return (
    <div id="stars-container">
      {stars.map((star, index) => (
        <div
          className="star"
          key={index}
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Stars;
