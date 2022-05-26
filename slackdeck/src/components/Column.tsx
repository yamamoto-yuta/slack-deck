import React from 'react';
import { chooseColumnColor, ColumnConfig, columnElementId, columnIframeClassName, columnIframeId, COLUMN_WIDTH_OPTIONS_VALUE } from '../shared/column';
import { SlackUrlConverter } from '../shared/slackUrlConverter';
import { ColumnHeader } from './ColumnHeader';

export const Column: React.FC<{
  rerender: React.Dispatch<React.SetStateAction<number>>,
  columnList: ColumnConfig[],
  columnIndex: number,
  columnConfig: ColumnConfig,
  columnElement: HTMLDivElement,
  slackUrlTable: SlackUrlConverter[],
}> = (props) => {
  const [selectedColumnWidthOptionIndex, setSelectedColumnWidthOptionIndex] = React.useState(COLUMN_WIDTH_OPTIONS_VALUE.indexOf(props.columnConfig.width));

  return (
    <div
      id={columnElementId`${props.columnIndex}`}
      className="column"
      style={{
        minWidth: COLUMN_WIDTH_OPTIONS_VALUE[selectedColumnWidthOptionIndex],
        width: COLUMN_WIDTH_OPTIONS_VALUE[selectedColumnWidthOptionIndex],
        backgroundColor: chooseColumnColor(props.columnIndex),
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: chooseColumnColor(props.columnIndex),
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
        slackUrlTable={props.slackUrlTable}
      />
      <iframe
        id={columnIframeId`${props.columnIndex}`}
        className={columnIframeClassName}
        src={props.columnConfig.url}
      />
    </div >
  )
};