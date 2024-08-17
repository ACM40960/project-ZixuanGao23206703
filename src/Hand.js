import React from 'react';

const Hand = ({ cards }) => (
  <>
    {cards.map((card, index) => (
      <img key={index} src={card.image} alt={card.code} className="card-image" />
    ))}
  </>
);

export default Hand;

// 为什么这个card.image不需要从哪里导入  我没有看到哪里有card.image 为啥在网页上可以直接显示