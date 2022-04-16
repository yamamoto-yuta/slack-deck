import React from 'react';
import { ColumnConfig, COLUMN_WIDTH_OPTIONS_VALUE } from '../shared/column';
import { ColumnHeader } from './ColumnHeader';

export const Column: React.FC<{
  rerender: React.Dispatch<React.SetStateAction<number>>,
  columnList: ColumnConfig[],
  columnIndex: number,
  columnCofig: ColumnConfig,
  columnElement: HTMLDivElement,
}> = (props) => {
  const [selectedColumnWidthOptionIndex, setSelectedColumnWidthOptionIndex] = React.useState(0);

  return (
    <div
      className="column"
      style={{
        minWidth: COLUMN_WIDTH_OPTIONS_VALUE[selectedColumnWidthOptionIndex],
        width: COLUMN_WIDTH_OPTIONS_VALUE[selectedColumnWidthOptionIndex],
        backgroundColor: "red",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "red",
      }}
    >
      <ColumnHeader
        setSelectedColumnWidthOptionIndex={setSelectedColumnWidthOptionIndex}
      />
      <iframe src="https://app.slack.com/client/T02M52Z4VPA/unreads" />
    </div >
  )
};