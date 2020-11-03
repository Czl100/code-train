import React from 'react';
import DetailIcon from '../asserts/detail-arrow';

interface IBreadCrumpWrap {
  breadcrump: Array<ISourceItem>;
  searchVal: string;
  onClick(val: ISourceItem): void;
}
const BreadcrumpWrap: React.FC<IBreadCrumpWrap> = (props) => {
  const { breadcrump, searchVal, onClick } = props;
  const N = breadcrump.length - 1;

  // 搜索模式
  if (searchVal !== '') {
    return (
      <div className="breadcrump-wrap">
        <span>搜索结果</span>
        {breadcrump?.length}项
      </div>
    );
  }
  return (
    <ul className="breadcrump-wrap">
      {breadcrump.map((item, idx) => {
        let label = item.label === '全国' ? '全部省市' : item.label;
        label = label === '国外' ? '国家' : label;
        return (
          <li key={item.id} onClick={() => onClick(item)}>
            {label}
            {idx === N ? '' : <DetailIcon color="#565e66" />}
          </li>
        );
      })}
    </ul>
  );
};

export default BreadcrumpWrap;
