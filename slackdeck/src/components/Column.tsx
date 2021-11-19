import React from "react";
import { Button, Form } from "react-bootstrap";
import { ColumnConfig, WIDTH_OPTION_LIST } from "../Contract";
import { saveColumns } from "../functions/column";

const columnMoveLeftButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-mv-l-btn-${columnIndex}`;
const columnMoveRightButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-mv-r-btn-${columnIndex}`;
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

  const onClickMoveLeftButton = () => {
    // Calculate new column index
    let colElIdx = props.columnIndex;
    let newColElIdx = colElIdx - 1;
    // Switch column
    if (newColElIdx >= 0) {
      console.log(document.getElementById(columnElementId`${colElIdx}`));
      console.log(document.getElementById(columnElementId`${newColElIdx}`));
      document.getElementById('wrapper').insertBefore(document.getElementById(columnElementId`${colElIdx}`), document.getElementById(columnElementId`${newColElIdx}`));
    } else {
      document.getElementById('wrapper').appendChild(document.getElementById(columnElementId`${colElIdx}`));
      newColElIdx += props.columnList.length;
    }
    // Update column list
    let tmp = props.columnList[colElIdx];
    props.columnList[colElIdx] = props.columnList[newColElIdx];
    props.columnList[newColElIdx] = tmp;
    // Update element id
    updateElementID();
    // Save column
    saveColumns(props.columnList, props.setSavedTime);
  }

  const onClickMoveRightButton = () => {
    // Calculate new column index
    let colElIdx = props.columnIndex;
    let newColElIdx = colElIdx + 1;
    // Switch column
    if (newColElIdx < props.columnList.length) {
      document.getElementById('wrapper').insertBefore(document.getElementById(columnElementId`${newColElIdx}`), document.getElementById(columnElementId`${colElIdx}`));
    } else {
      document.getElementById('wrapper').insertBefore(document.getElementById(columnElementId`${colElIdx}`), document.getElementById(columnElementId`${0}`));
      newColElIdx -= props.columnList.length;
    }
    // Update column list
    let tmp = props.columnList[colElIdx];
    props.columnList[colElIdx] = props.columnList[newColElIdx];
    props.columnList[newColElIdx] = tmp;
    // Update element id
    updateElementID();
    // Save column
    saveColumns(props.columnList, props.setSavedTime);
  }

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
        <Button
          id={columnMoveLeftButtonId`${props.columnIndex}`}
          className="btn btn-primary col-mv-l-btn"
          onClick={onClickMoveLeftButton}
        >&lt;</Button>
        <Button
          id={columnMoveRightButtonId`${props.columnIndex}`}
          className="btn btn-primary col-mv-r-btn"
          onClick={onClickMoveRightButton}
        >&gt;</Button>
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