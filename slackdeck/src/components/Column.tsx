import React from 'react';
import { ColumnConfig, columnElementId, columnIframeClassName, columnIframeId, COLUMN_WIDTH_OPTIONS_VALUE } from '../shared/column';
import { ColumnHeader } from './ColumnHeader';

export const Column: React.FC<{
  rerender: React.Dispatch<React.SetStateAction<number>>,
  columnList: ColumnConfig[],
  columnIndex: number,
  columnConfig: ColumnConfig,
  columnElement: HTMLDivElement,
}> = (props) => {
  const [selectedColumnWidthOptionIndex, setSelectedColumnWidthOptionIndex] = React.useState(COLUMN_WIDTH_OPTIONS_VALUE.indexOf(props.columnConfig.width));

  return (
    <div
      id={columnElementId`${props.columnIndex}`}
      className="column"
      style={{
        minWidth: COLUMN_WIDTH_OPTIONS_VALUE[selectedColumnWidthOptionIndex],
        width: COLUMN_WIDTH_OPTIONS_VALUE[selectedColumnWidthOptionIndex],
        // backgroundColor: "red",
        // borderWidth: "1px",
        // borderStyle: "solid",
        // borderColor: "red",
      }}
    >
      <ColumnHeader
        selectedColumnWidthOptionIndex={selectedColumnWidthOptionIndex}
        setSelectedColumnWidthOptionIndex={setSelectedColumnWidthOptionIndex}
        rerender={props.rerender}
        columnList={props.columnList}
        columnIndex={props.columnIndex}
        columnConfig={props.columnConfig}
        columnElement={props.columnElement}
      />
      <iframe
        id={columnIframeId`${props.columnIndex}`}
        className={columnIframeClassName}
        src={props.columnConfig.url}
      />
    </div >
  )
};