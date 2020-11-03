import React from 'react';
import Item from './item';

export interface ISelectWrap {
  data: Array<ISourceItem>;
  selectedData: Array<ISourceItem>;
  searchVal: string;
  maxSelectNumber?: number;
  clickItemLabel(val: ISourceItem): void;
  clickItemCheck(val: ISourceItem): void;
}

const SelectWrap: React.FC<ISelectWrap> = (props) => {
  const { data, selectedData, searchVal, clickItemLabel, clickItemCheck } = props;

  return (
    <ul className="select-area">
      {data.map((item) => {
        return (
          <Item
            key={item.id}
            data={item}
            searchVal={searchVal}
            ischecked={selectedData.some((data) => data.id === item.id)}
            onClickLabel={clickItemLabel}
            onClickCheck={clickItemCheck}
          />
        );
      })}
    </ul>
  );
};

export default SelectWrap;
