import React, { useState } from 'react';
import CheckBox from './components';
import './index.scss';

type IDirection = 'V' | 'H';
interface Item {
  label: string;
  value: string | number;
}
interface IProps {
  options: Array<Item>;
  canSelectAll?: boolean;
  direction?: IDirection;
  onChange?(value: any): void;
}

const CheckBoxs: React.FC<IProps> = (props) => {
  const { direction, options, canSelectAll } = props;
  const [selectList, setSelectList] = useState<Array<Item>>([]);
  const handleChange = typeof props.onChange === 'function' ? props.onChange : () => {};

  const SelectAllCmp = React.useMemo(() => {
    if (!canSelectAll) {
      return null;
    }
    return (
      <CheckBox
        item={{ label: '全选', value: -1 }}
        value={selectList?.length === options?.length}
        isLabelHot={true}
        onClick={selectAll}
      />
    );
  }, [canSelectAll, selectList]);

  const handleClick = (item) => {
    let idx = selectList.findIndex((e) => e.value === item.value);
    let newVal;
    if (idx !== -1) {
      newVal = selectList.slice(0, idx).concat(selectList.slice(idx + 1));
    } else {
      newVal = [...selectList, item];
    }
    setSelectList(newVal);
    handleChange(newVal);
  };

  function selectAll() {
    let newVal;
    if (options?.length === selectList?.length) {
      newVal = [];
    } else {
      newVal = [...options];
    }
    setSelectList(newVal);
    handleChange(newVal);
  }

  if (options?.length <= 0) {
    return null;
  }
  return (
    <div className={direction === 'V' ? 'warp-v' : 'warp-h'}>
      {SelectAllCmp}
      {options?.map((item) => {
        return (
          <CheckBox
            item={item}
            value={-1 !== selectList.findIndex((e) => e.value === item.value)}
            key={item.value}
            isLabelHot={true}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default CheckBoxs;
