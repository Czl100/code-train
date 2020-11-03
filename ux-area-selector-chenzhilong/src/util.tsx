export function formatSourceData(sourceData) {
  let areaData: any = {
    level0Data: [],
    level1Data: [],
    level2Data: [],
    level3Data: [],
    level4Data: [],
  };
  let levelIds = {
    level0: ['1', '2'],
    level1: [],
    level2: [],
    level3: [],
    level4: [],
  };
  let storeData = [];

  for (let index = 0; index < sourceData.length; index++) {
    const dataItem = sourceData[index];
    let tempData: any = {
      id: dataItem[0],
      label: dataItem[1][0],
      pid: dataItem[2] || '1',
      hasChild: dataItem[3],
    };
    if (dataItem[0] != '1' && dataItem[0] != '2') {
      formatDataLevel(levelIds, areaData, storeData, tempData);
    } else {
      tempData.pid = '0';
      tempData.hasChild = 1;
      tempData.level = 0;
      areaData.level0Data.push(tempData);
    }
  }

  storeData.length > 0 &&
    storeData.forEach((dataItem) => {
      formatDataLevel(levelIds, areaData, [], dataItem);
    });
  return areaData;
}

// 确定每个item 的 level
export function determineLevel(item, levelIds) {
  let itemLevel = -1;
  if (item.pid === '') return itemLevel;
  for (let level = 0; level < 4; level++) {
    if (levelIds['level' + level].indexOf(item.pid) > -1) {
      itemLevel = level + 1;
      break;
    }
  }
  return itemLevel;
}

export function formatDataLevel(levelIds, showAreaData, storeData, dataItem) {
  let isStored = false;
  for (let level = 0; level < 4; level++) {
    if (levelIds['level' + level].indexOf(dataItem.pid) > -1) {
      isStored = true;
      levelIds['level' + (level + 1)].push(dataItem.id);
      dataItem.level = level + 1;
      showAreaData['level' + (level + 1) + 'Data'].push(dataItem);
    }
  }
  if (!isStored) {
    storeData.push(dataItem);
  }
}

// 从数据源中获取当前需要展示的数据
export function getShowData(areaData, level, pid) {
  const canSelectRoot = false;
  let showData = areaData['level' + (level + 1) + 'Data'].filter((dataItem) => {
    return dataItem.pid == pid;
  });
  if (canSelectRoot && level === 0) {
    let root = {
      ...areaData[`level${level}Data`][pid === '1' ? 0 : 1],
      hasChild: 0,
    };
    return [root, ...showData];
  }
  return showData;
}
