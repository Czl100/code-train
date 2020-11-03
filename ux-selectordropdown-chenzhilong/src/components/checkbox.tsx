import React, { FC } from 'react';

export type Direction = 'H' | 'V';
export type Item = {
  text: string;
  value: string;
  textJson: string;
  isCheck: boolean;
  id: string;
};
interface IProps {
  direction?: Direction;
  isLabelHot?: boolean;
  item: Item;
  onClick(id: string): void;
  [key: string]: any;
}

const Checkbox: FC<IProps> = (props) => {
  const { direction, isLabelHot, item, onClick } = props;

  const handleClick = () => {
    onClick(item.id);
  };

  if (!props.children) {
    return null;
  }
  return (
    <div className={direction === 'H' ? 'checkbox checkbox--h' : 'checkbox checkbox--v'}>
      <input type="checkbox" id={item.value} onChange={handleClick} checked={item.isCheck} />
      <label htmlFor={isLabelHot === false ? '' : `${item.value}`}>{props.children}</label>
    </div>
  );
};

export default Checkbox;
