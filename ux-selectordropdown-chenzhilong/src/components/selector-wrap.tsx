import React, { FC, useState, useMemo, useCallback, LegacyRef } from 'react';
import CheckBox, { Direction, Item } from './checkbox';
import emptImg from './empty.png';
import './style.scss';

export interface IProps {
  dataSource: Array<Item>;
  searchText?: string;
  selectAllItem?: Item;
  className?: string;
  checkWrapRef: LegacyRef<HTMLDivElement>;
  onClickSure(): void;
  onClickItem(id: string): void;
  onClickAll(id: string): void;
  onFold(isFold: boolean): void;
  [key: string]: any;
}

const SelectorWrap: FC<IProps> = (props) => {
  const {
    dataSource,
    selectAllItem,
    searchText,
    onClickSure,
    onFold,
    checkWrapRef,
    className: clsName,
  } = props;

  const [isAllSelect, setIsAllSelect] = useState(true);
  const btnSure = useMemo(() => {
    return (
      <div className="btn-sure-wrap">
        <button onClick={onClickSure} className="btn-sure">
          确定
        </button>
      </div>
    );
  }, [onClickSure]);

  // 点击空白, 折叠弹窗
  const handleFold = useCallback((e) => {
    const target = e.target;
    if (target.tagName === 'DIV') {
      onFold(true);
    }
  }, []);

  if (dataSource.length === 0) {
    return (
      <div
        className={`drop-checkbox-wrap ${!!clsName ? clsName : ''}`}
        onClick={handleFold}
        ref={checkWrapRef}>
        <img className="empty-img" src={emptImg} alt="空数据" />
        {btnSure}
      </div>
    );
  }
  return (
    <div
      className={`drop-checkbox-wrap ${!!clsName ? clsName : ''}`}
      onClick={handleFold}
      ref={checkWrapRef}>
      <CheckBox item={selectAllItem as Item} onClick={props.onClickAll}>
        {selectAllItem?.text}
      </CheckBox>

      {dataSource.map((item) => {
        if (searchText) {
          const startIdx = item.text['search'](`${searchText}`);
          let endIdx = -1;
          if (startIdx !== -1) {
            endIdx = startIdx + searchText.length;
            return (
              <CheckBox key={item.id} item={item} onClick={props.onClickItem}>
                <span>{item.text.slice(0, startIdx)}</span>
                <span className="search-hold">{searchText}</span>
                <span>{item.text.slice(endIdx)}</span>
              </CheckBox>
            );
          } else {
            return null;
          }
        }
        return (
          <CheckBox key={item.id} item={item} onClick={props.onClickItem}>
            {item.text}
          </CheckBox>
        );
      })}

      {btnSure}
    </div>
  );
};

export default SelectorWrap;
