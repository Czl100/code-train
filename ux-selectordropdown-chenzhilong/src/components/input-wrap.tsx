import React, { FC, useCallback } from 'react';
import { Item } from './checkbox';
import FillItemWrap from './fill-item';

interface IProps {
  value: string;
  fillItems: Array<Item>;
  isFold: boolean;
  onClick(value: boolean | null): void;
  handleInput(e: React.FormEvent<HTMLInputElement>): void;
  deleteFillItem(e: React.MouseEvent, id: string): void;
  deleteKeyDown(e: React.KeyboardEvent);
}

// FillItemWrap
const InputWrap: FC<IProps> = (props) => {
  const { value, fillItems, isFold, onClick, handleInput, deleteFillItem, deleteKeyDown } = props;

  const handleClickBtn = useCallback(() => {
    onClick(null);
  }, [onClick]);

  const handleClickInput = useCallback(() => {
    isFold && onClick(false);
  }, [onClick]);

  return (
    <div className={`drop-input-wrap ${isFold ? '' : 'drop-input-wrap--active'}`}>
      {fillItems?.map((item) => {
        return <FillItemWrap key={item.id} item={item} deleteFillItem={deleteFillItem} />;
      })}
      <input
        type="text"
        placeholder={fillItems?.length === 0 ? '请选择' : ''}
        onChange={handleInput}
        onKeyDown={deleteKeyDown}
        value={value}
        onClick={handleClickInput}
      />
      <div
        className={`btn-drop ${isFold ? 'btn-drop--up' : 'btn-drop--down'}`}
        onClick={handleClickBtn}></div>
      {props.children}
    </div>
  );
};

export default InputWrap;
