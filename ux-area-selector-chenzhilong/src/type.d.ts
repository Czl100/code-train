declare module '*.png';

interface ISourceItem {
  id: string;
  label: string;
  pid: string;
  hasChild: number;
}

interface IAreaData {
  level0Data: Array<ISourceItem>;
  level1Data: Array<ISourceItem>;
  level2Data: Array<ISourceItem>;
  level3Data: Array<ISourceItem>;
}
