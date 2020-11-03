import React from 'react';
import './index.scss';

interface Item {
  label: string;
  value: number | string;
}
interface IProps {
  item: Item;
  value: boolean;
  isLabelHot?: Boolean;
  className?: string;
  onClick(item: Item): void;
}

const CheckBox: React.FC<IProps> = (props) => {
  const { item, isLabelHot, className: clsName, onClick, value } = props;
  const { label } = item;

  const handleClick = () => {
    onClick(item);
  };
  return (
    <div className={`checkbox-wrap ${clsName ? clsName : ''}`}>
      <input
        type="checkbox"
        id={String(item.value)}
        checked={value}
        onChange={handleClick}
        className={`checkbox ${value ? 'checkbox-checked' : 'checkbox-unchecked'}`}
      />
      <label className="label" htmlFor={isLabelHot ? `${String(item.value)}` : ''}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
