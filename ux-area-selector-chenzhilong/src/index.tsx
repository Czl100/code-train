import React, { useEffect, useState, useMemo } from 'react';
import InputWrap from './components/input-wrap';
import LeftContainer from './components/left-container/left-panel';
import RightContainer from './components/right-container/right-panel';
import Footer from './components/footer';
import * as processData from './util';
import './components/style.scss';
import './index.scss';

export interface IAreaSelector {
  api: string;
  maxSelectNumber: number;
  onChange?(value: Array<ISourceItem>): void;
}

const initAreaData = {
  level0Data: [{ id: '', label: '', pid: '', hasChild: 0 }],
  level1Data: [{ id: '', label: '', pid: '', hasChild: 0 }],
  level2Data: [{ id: '', label: '', pid: '', hasChild: 0 }],
  level3Data: [{ id: '', label: '', pid: '', hasChild: 0 }],
};
const AreaSelector: React.FC<IAreaSelector> = (props) => {
  const { api, maxSelectNumber } = props;
  const [areaData, setAreaData] = useState<IAreaData>(initAreaData);
  const [areaDataStr, setAreaDataStr] = useState<string>('');
  const [selectedData, setSelectedData] = useState<Array<ISourceItem>>([]);
  const [inputVal, setInputVal] = useState<string>('');

  // 请求常量数据, 初始化state
  useEffect(() => {
    fetch(api)
      .then((response) => response.text())
      .then((text) => {
        const str = text.slice(11, -1);
        const data = JSON.parse(str);
        const initAreaData = processData.formatSourceData(data);
        setAreaDataStr(str);
        setAreaData(initAreaData);
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  const handleChange = React.useCallback(
    (value: Array<ISourceItem>) => {
      return props.onChange ? props.onChange(value) : () => {};
    },
    [props.onChange],
  );

  const handleChangeSelectData = React.useCallback(
    (value) => {
      selectedData !== value && setSelectedData(value);
      handleChange(value);
    },
    [setSelectedData, handleChange],
  );

  const matchData = useMemo(() => {
    if (inputVal === '') return [];
    const result = areaDataStr.matchAll(new RegExp(inputVal, 'g'));
    let ids: any[] = [];
    let items: any[] = [];
    for (const match of result) {
      let startIdx = match.index || -1;
      if (startIdx === -1) return items;
      let itemId = findItem(areaDataStr, startIdx);
      ids.push(itemId);
    }
    for (let level = 0; level < 4 && ids.length > 0; level++) {
      areaData[`level${level}Data`].forEach((item) => {
        let idx = ids.indexOf(item.id);
        if (idx !== -1) {
          items.push(item);
          ids.splice(idx, 1);
        }
      });
    }

    return items;
  }, [areaDataStr, areaData, inputVal]);

  const clickItemCheck = (item) => {
    if (typeof maxSelectNumber !== 'undefined' && selectedData.length >= maxSelectNumber) {
      return;
    }
    let curIdx = getIdxOfItem(selectedData, item.id);
    if (curIdx === -1) {
      // 清除所有的父节点和子节点
      // prettier-ignore
      let pIds:any[] = [], childs: any[] = [];
      let pId = item.pid;
      let level = item.level;
      // 父节点
      while (level-- > 1) {
        let pItem = getItem(areaData[`level${level}Data`], pId);
        getIdxOfItem(selectedData, pId) !== -1 && pIds.push(pId);
        pId = pItem && (pItem as any).pid;
      }
      let tmpSelectedData = selectedData;
      pIds.forEach((id) => (tmpSelectedData = deleteItem(tmpSelectedData, id)));

      // 子节点
      let tmpItem = item;
      if (tmpItem.hasChild) {
        getAllChlds(areaData, item, childs);
      }
      childs.forEach((child) => (tmpSelectedData = deleteItem(tmpSelectedData, child.id)));

      handleChangeSelectData([...tmpSelectedData, item]);
    } else {
      handleChangeSelectData([...selectedData.slice(0, curIdx), ...selectedData.slice(curIdx + 1)]);
    }
  };

  const clearSelected = () => {
    selectedData.length !== 0 && handleChangeSelectData([]);
  };

  const clearItem = (id) => {
    handleChangeSelectData(deleteItem(selectedData, id));
  };

  const onClickSure = () => {
    handleChangeSelectData(selectedData);
  };
  const onClickCancel = () => {
    // todo
  };

  const handleChangeInputValue = (val) => {
    val !== inputVal && setInputVal(val);
  };

  // render
  return (
    <div className="area-selector-wrap">
      <InputWrap changeInputVal={handleChangeInputValue} />
      <div className="content-wrap">
        <LeftContainer
          areaData={areaData}
          matchData={matchData}
          selectedData={selectedData}
          maxSelectNumber={maxSelectNumber}
          searchVal={inputVal}
          clickItemCheck={clickItemCheck}
        />
        <RightContainer
          totalNum={maxSelectNumber}
          itemList={selectedData}
          clearSelected={clearSelected}
          clearItem={clearItem}
        />
      </div>
      <Footer className="footer" onSure={onClickSure} onCancel={onClickCancel} />
    </div>
  );
};

/**
 * 工具函数, 纯函数
 */
function getIdxOfItem(list, id) {
  let curIdx = -1;
  list.some((data, idx) => {
    if (data.id === id) {
      curIdx = idx;
      return true;
    }
    return false;
  });
  return curIdx;
}

function getItem(list, id) {
  let item = null;
  list.some((data) => {
    if (data.id === id) {
      item = data;
      return true;
    }
    return false;
  });
  return item;
}

function getAllChlds(areaData, item, childs) {
  if (item.hasChild) {
    let list = getChilds(areaData, item);
    childs.push(...list);
    list.forEach((pItem) => getAllChlds(areaData, pItem, childs));
  }
}

function getChilds(areaData, pItem) {
  let childs: any[] = [];
  areaData[`level${pItem.level + 1}Data`].forEach((item) => {
    item.pid === pItem.id && childs.push(item);
  });
  return childs;
}

// 删除列表中的某个元素, 返回新的list
function deleteItem(list, id) {
  let idx = getIdxOfItem(list, id);
  if (idx !== -1) {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  } else {
    return list;
  }
}

// 从 areaDataStr 中提取出匹配的 item
function findItem(areaDataStr, idxStr) {
  let i = 0,
    startIdx = -1,
    endIdx = -1;
  let flag = 0;

  for (i = idxStr - 1; flag < 2; i--) {
    if (areaDataStr[i] === '[') {
      flag++;
    }
  }
  startIdx = i + 1;
  flag = 0;
  for (i = idxStr + 1; flag < 2; i++) {
    if (areaDataStr[i] === ']') {
      flag++;
    }
  }
  endIdx = i;
  const itemStr = areaDataStr.slice(startIdx, endIdx);
  const itemObj = JSON.parse(itemStr);
  return itemObj[0];
  // return {
  //   id: itemObj[0],
  //   label: itemObj[1][0],
  //   pid: itemObj[2] || '1',
  //   hasChild: itemObj[3],
  // };
}

export default AreaSelector;
