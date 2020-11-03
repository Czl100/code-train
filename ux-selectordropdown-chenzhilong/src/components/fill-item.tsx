import React, { FC } from 'react';
import { Item } from './checkbox';

export interface IFillItemWrap {
  item: Item;
  deleteFillItem(e: React.MouseEvent, id: string): void;
}

const FillItemWrap: FC<IFillItemWrap> = (props) => {
  const { item, deleteFillItem } = props;
  const handleClick = (e) => {
    deleteFillItem(e, item.id);
  };
  return (
    <div className="fill-item" onClick={handleClick}>
      {item.text}
      <div className="btn-delete">x</div>
    </div>
  );
};

export default FillItemWrap;
