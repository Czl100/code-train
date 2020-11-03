import React from 'react';
import SeacrchImg from './asserts/searchIcon.png';

export interface IInputWrap {
  changeInputVal(val: string): void;
}
const InputWrap: React.FC<IInputWrap> = (props) => {
  const { changeInputVal } = props;

  const handleEnter = (e) => {
    const val = e.target.value;
    if (e.keyCode === 13) {
      return changeInputVal(val);
    }
    if (e.keyCode === 8 && val.length === 1) {
      changeInputVal('');
    }
  };
  return (
    <div className="input-wrap">
      <input type="text" placeholder="搜索" onKeyDown={handleEnter} />
      <img src={SeacrchImg} alt="搜索" />
    </div>
  );
};

export default InputWrap;
