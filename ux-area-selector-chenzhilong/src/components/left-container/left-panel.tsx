import React, { useState, useMemo, useEffect } from 'react';
import BarGroup from './bar-group';
import BreadcrumpWrap from './breadcrump-wrap';
import SelectWrap from './select-wrap';

export interface ILeftPanel {
  areaData: IAreaData;
  selectedData: Array<ISourceItem>;
  matchData: Array<ISourceItem>;
  maxSelectNumber: number;
  searchVal: string;
  clickItemCheck(item: ISourceItem): void;
}
const LeftPanel: React.FC<ILeftPanel> = (props) => {
  const { areaData, selectedData, matchData, maxSelectNumber, searchVal, clickItemCheck } = props;
  const [curGroup, setCurGroup] = useState('1');
  const [breadcrump, setBreadcrump] = useState<Array<ISourceItem>>([]);

  useEffect(() => {
    areaData?.level0Data && setBreadcrump([areaData?.level0Data[0]]);
  }, [areaData]);

  const showItems = useMemo(() => {
    const level = breadcrump.length;
    if (searchVal === '') {
      if (level === 0) {
        return [];
      }
      return areaData[`level${level}Data`].filter((item) => item.pid === breadcrump[`${level - 1}`].id);
    }
    return matchData;
  }, [breadcrump, areaData, matchData, searchVal]);

  // 切换Tab
  const onChangeGroup = (id: string) => {
    if (id !== curGroup) {
      let group = areaData.level0Data.filter((item) => item.id === id);
      setBreadcrump(group);
      setCurGroup(id);
    }
  };
  //
  const clickItemLabel = (item) => {
    setBreadcrump([...breadcrump, item]);
  };

  const clickBreadCrump = (item) => {
    const N = breadcrump.length;
    if (item.id !== breadcrump[N - 1].id) {
      setBreadcrump(breadcrump.slice(0, N - 1));
    }
  };
  // render
  return (
    <div className="left-wrap">
      <BarGroup groups={areaData?.level0Data} curGroup={curGroup} onChangeGroup={onChangeGroup} />
      <BreadcrumpWrap
        breadcrump={searchVal === '' ? breadcrump : matchData}
        searchVal={searchVal}
        onClick={clickBreadCrump}
      />
      <SelectWrap
        data={showItems}
        maxSelectNumber={maxSelectNumber}
        selectedData={selectedData}
        searchVal={searchVal}
        clickItemLabel={clickItemLabel}
        clickItemCheck={clickItemCheck}
      />
    </div>
  );
};

export default LeftPanel;
