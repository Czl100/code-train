import React from 'react';
import DetailIcon from '../asserts/detail-arrow';
import CheckedIcon from '../asserts/checkbox-checked';
import UnCheckedIcon from '../asserts/checkbox-unchecked';

interface IItem {
  ischecked: boolean;
  data: ISourceItem;
  searchVal: string;
  onClickCheck(val: ISourceItem): void;
  onClickLabel(val: ISourceItem): void;
}
const Item: React.FC<IItem> = (props) => {
  const { ischecked, data, searchVal, onClickCheck, onClickLabel } = props;
  const { label, hasChild } = data;

  const handleClickLabel = () => {
    if (hasChild) {
      onClickLabel(data);
    }
  };

  const handleClickCheck = () => {
    onClickCheck(data);
  };

  const clsName = hasChild ? 'label label--expand' : 'label';
  let str = label;
  if (searchVal !== '') {
    str = str.replace(new RegExp(searchVal, 'g'), `<span class="hight-light">${searchVal}</span>`);
  }

  return (
    <li className="item">
      <span className="checkbox" onClick={handleClickCheck}>
        {ischecked ? <CheckedIcon /> : <UnCheckedIcon />}
      </span>
      {searchVal === '' ? (
        <label className={clsName} onClick={handleClickLabel}>
          {label}
        </label>
      ) : (
        <label className={clsName} onClick={handleClickLabel} dangerouslySetInnerHTML={{ __html: str }}></label>
      )}
      {hasChild ? <DetailIcon /> : ''}
    </li>
  );
};

export default Item;
