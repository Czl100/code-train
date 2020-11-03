import React from 'react';
import deleteImg from '../asserts/delete.png';

export interface IRightPanel {
  totalNum: number;
  itemList: Array<ISourceItem>;
  clearSelected(): void;
  clearItem(id: string): void;
}
const RightPanel: React.FC<IRightPanel> = (props) => {
  const { totalNum, itemList, clearSelected, clearItem } = props;
  const n = itemList.length;

  const handleclearAll = () => {
    clearSelected();
  };

  return (
    <div className="right-wrap">
      <div className="right-wrap-title">
        <span>已选地区</span>
        <span>
          {n}/{totalNum}
        </span>
        <input
          type="button"
          value="清空已选"
          className={n > 0 ? 'clear-all' : 'clear-all clear-all--inactive'}
          onClick={handleclearAll}
        />
      </div>

      {n === 0 ? (
        <div className="empty">请在左侧选择地区</div>
      ) : (
        <ul className="seleted-list">
          {itemList.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.label}</span>
                <img src={deleteImg} onClick={() => clearItem(item.id)} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RightPanel;
