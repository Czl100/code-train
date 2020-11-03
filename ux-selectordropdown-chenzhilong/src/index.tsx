import React, { useState, useCallback } from 'react';
import SelectorWrap from './components/selector-wrap';
import { Item } from './components/checkbox';
import InputWrap from './components/input-wrap';
import './index.scss';

export interface IProps {
  options: Array<any>;
  onChange?(value: any): void;
  [key: string]: any;
}
const SelectorDrop: React.FC<IProps> = (props) => {
  const { options } = props;
  const [dataSource, setData] = useState([...options]);
  const [filledItems, setFill] = useState<Array<Item>>([]);
  const [inputText, setInput] = useState('');
  const [isFold, setFold] = useState(true);
  const checkWrapRef = React.useRef<HTMLDivElement>();
  const [selectAllItem, setSelectAll] = useState({
    text: '全选',
    value: '0',
    textJson: '全选',
    id: '00000000000',
    isCheck: false,
  });
  let handleChange = typeof props.onChange === 'function' ? props.onChange : () => {};

  React.useMemo(() => {
    setData(options);
  }, [options]);

  // 只在Mounted之后执行一次
  React.useEffect(() => {
    document.documentElement.addEventListener('click', handleClickOnBody);
    return () => document.documentElement.removeEventListener('click', handleClickOnBody);
  }, []);

  const handleClickOnBody = useCallback((e) => {
    const target = e.target;
    if (target.contains(checkWrapRef.current) || target === checkWrapRef.current) {
      handleFold(true);
    }
  }, []);

  // dataFilter
  const dataFilter = React.useMemo(() => {
    return dataSource.filter((item) => new RegExp(inputText).test(item.text));
  }, [inputText, dataSource]);

  // 确定
  const handleClickSure = () => {
    const filledItem = dataSource.filter((item) => item.isCheck);
    setFill(filledItem);
    handleFold(true);
    handleChange(filledItem);
  };

  // 单选
  const handleClickItem = (id: string) => {
    let isSelectAll = true;
    const filteredIds = dataFilter.map((item) => item.id);
    const newData = dataSource.map((data) => {
      if (data.id === id) {
        isSelectAll = isSelectAll && !data.isCheck;
        return {
          ...data,
          isCheck: !data.isCheck,
        };
      } else if (filteredIds.includes(data.id)) {
        isSelectAll = isSelectAll && data.isCheck;
      }
      return data;
    });

    setData(newData);
    setSelectAll({
      ...selectAllItem,
      isCheck: isSelectAll,
    });
  };
  // 全选
  const handleClickAll = () => {
    const ids = dataFilter.map((item) => item.id);
    const newData = dataSource.map((data) => {
      if (ids.includes(data.id)) {
        return {
          ...data,
          isCheck: !selectAllItem.isCheck ? true : false,
        };
      } else {
        return data;
      }
    });

    setData(newData);
    setSelectAll({
      ...selectAllItem,
      isCheck: !selectAllItem.isCheck,
    });
  };
  // 展开\折叠
  const handleFold = (value) => {
    typeof value === 'boolean' ? setFold(value) : setFold(!isFold);
  };
  // 搜索
  const handleInput = (e) => {
    const value = e.target.value;
    let allSelectText = '全选';
    let allSelectIsCheck = true;
    if (value) {
      allSelectText = '全选搜索结果';
    }

    const newFiltedData = dataSource.filter((item) => new RegExp(value).test(item.text));
    newFiltedData.forEach((item) => {
      allSelectIsCheck = allSelectIsCheck && item.isCheck;
    });

    setInput(value);
    setSelectAll({
      ...selectAllItem,
      text: allSelectText,
      isCheck: allSelectIsCheck,
    });
  };
  // 删除填充项
  const deleteFillItem = (e, id: string) => {
    e.stopPropagation();
    handleFold(true);
    const fillItems = filledItems?.filter((item) => item.id !== id);
    handleClickItem(id);
    setFill(fillItems);
    handleChange(fillItems);
  };
  // delete 按键
  const deleteKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 8 && filledItems!.length > 0 && inputText === '') {
      const N = filledItems!.length - 1;
      handleClickItem(filledItems![N].id);
      deleteFillItem(e, filledItems![N].id);
      return;
    }
  };

  if (dataSource.length === 0) {
    return null;
  }
  return (
    <div className="drop-selectorbox-wrap">
      <InputWrap
        value={inputText}
        isFold={isFold}
        fillItems={filledItems as Item[]}
        onClick={handleFold}
        handleInput={handleInput}
        deleteFillItem={deleteFillItem}
        deleteKeyDown={deleteKeyDown}
      />

      <SelectorWrap
        className={isFold ? 'unshow' : 'show'}
        direction="V"
        dataSource={dataFilter}
        searchText={inputText}
        checkWrapRef={checkWrapRef as any}
        onFold={handleFold}
        selectAllItem={selectAllItem}
        onClickSure={handleClickSure}
        onClickItem={handleClickItem}
        onClickAll={handleClickAll}
      />
    </div>
  );
};

export default SelectorDrop;
