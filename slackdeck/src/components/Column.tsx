import React from "react";
import { Button, Form } from "react-bootstrap";
import { ColumnConfig, WIDTH_OPTION_LIST } from "../Contract";
import { saveColumns } from "../functions/column";

const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;

export const Column: React.FC<{
  columnList: Array<ColumnConfig>,
  setSavedTime: React.Dispatch<React.SetStateAction<Date>>,
  columnIndex: number,
  columnCofig: ColumnConfig
}> = (props) => {
  const [colName, setColName] = React.useState<string>(props.columnCofig.name);

  const updateElementID = () => {
    for (var i = 0; i < props.columnList.length; i++) {
      document.getElementsByClassName('column')[i].id = columnElementId`${i}`;
      document.getElementsByClassName('col-iframe')[i].id = columnIframeId`${i}`;
      document.getElementsByClassName('col-del-btn')[i].id = columnDeleteButtonId`${i}`;
    }
  };

  const onChangeWidthOption = (e) => {
    props.columnCofig.width = e.target.value;
    let _col = document.getElementsByClassName('column')[props.columnIndex] as HTMLElement;
    _col.style.minWidth = e.target.value;
    _col.style.width = e.target.value;
  }

  const onClickDeleteButton = () => {
    // Remove
    props.columnList.splice(props.columnIndex, 1);;
    saveColumns(props.columnList, props.setSavedTime);
    document.getElementsByClassName('column')[props.columnIndex].remove();
    // Update other elements
    updateElementID();
  }

  return (
    <div
      id={columnElementId`${props.columnIndex}`}
      className="column bg-dark"
      style={{
        minWidth: props.columnCofig.width,
        width: props.columnCofig.width,
      }}
    >
      <div className="col-header">
        <Form.Control
          type="text"
          value={colName}
          onChange={(e) => setColName(e.target.value)}
        />
        <Form.Select
          className="w-auto"
          onChange={onChangeWidthOption}
        >
          {WIDTH_OPTION_LIST.map((option) => (
            <option
              value={option.value}
              selected={props.columnCofig.width === option.value}
            >{option.text}</option>
          ))}
        </Form.Select>
        <Button
          id={columnDeleteButtonId`${props.columnIndex}`}
          className="btn btn-danger col-del-btn"
          onClick={onClickDeleteButton}
        >x</Button>
      </div>
      <iframe
        id={columnIframeId`${props.columnIndex}`}
        className={"col-iframe"}
        src={props.columnCofig.url}
      />
    </div>
  )
}