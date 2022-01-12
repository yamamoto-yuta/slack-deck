import { faChevronLeft, faChevronRight, faClone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import { ColumnConfig, WIDTH_OPTION_LIST } from "../Contract";
import { saveColumns } from "../functions/column";
import cloneDeep from 'lodash/cloneDeep';

const columnMoveLeftButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-mv-l-btn-${columnIndex}`;
const columnMoveRightButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-mv-r-btn-${columnIndex}`;
const columnDuplicateButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-dup-btn-${columnIndex}`;
const columnNameInputId = (_: TemplateStringsArray, columnIndex: number) => `col-name-input-${columnIndex}`;
const columnWidthSelectId = (_: TemplateStringsArray, columnIndex: number) => `col-select-${columnIndex}`;
const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;
const exttractColumnIdxFromId = (colDelBtnId: string) => parseInt(colDelBtnId.split('-').slice(-1)[0]);

export const Column: React.FC<{
  rerender: React.Dispatch<React.SetStateAction<number>>,
  columnList: Array<ColumnConfig>,
  columnIndex: number,
  columnCofig: ColumnConfig,
  columnElement: HTMLDivElement,
}> = (props) => {
  const [colName, setColName] = React.useState<string>(props.columnCofig.name);

  const updateElementID = () => {
    for (var i = 0; i < props.columnList.length; i++) {
      document.getElementsByClassName('column')[i].id = columnElementId`${i}`;
      document.getElementsByClassName('col-mv-l-btn')[i].id = columnMoveLeftButtonId`${i}`;
      document.getElementsByClassName('col-mv-r-btn')[i].id = columnMoveRightButtonId`${i}`;
      document.getElementsByClassName('col-name-input')[i].id = columnNameInputId`${i}`;
      document.getElementsByClassName('col-width-select')[i].id = columnWidthSelectId`${i}`;
      document.getElementsByClassName('col-iframe')[i].id = columnIframeId`${i}`;
    }
  };

  const onClickMoveLeftButton = () => {
    // Save column
    saveColumns(props.columnList);
    // Calculate new column index
    let colElIdx = exttractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    let newColElIdx = colElIdx - 1;
    // Switch column
    if (newColElIdx >= 0) {
      document.getElementById('wrapper').insertBefore(
        document.getElementById(columnElementId`${colElIdx}`).parentElement,
        document.getElementById(columnElementId`${newColElIdx}`).parentElement
      );
    } else {
      document.getElementById('wrapper').appendChild(
        document.getElementById(columnElementId`${colElIdx}`).parentElement
      );
      newColElIdx += props.columnList.length;
    }
    document.getElementById(columnElementId`${colElIdx}`).getElementsByTagName('iframe')[0].src = props.columnList[colElIdx].url;
    // Update column list
    let tmp = props.columnList[colElIdx];
    props.columnList[colElIdx] = props.columnList[newColElIdx];
    props.columnList[newColElIdx] = tmp;
    // Update element id
    updateElementID();
    // Save column
    saveColumns(props.columnList);
    // Rerender deck
    props.rerender(Math.random());
  }

  const onClickMoveRightButton = () => {
    // Save column
    saveColumns(props.columnList);
    // Calculate new column index
    let colElIdx = exttractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    let newColElIdx = colElIdx + 1;
    // Switch column
    if (newColElIdx < props.columnList.length) {
      document.getElementById('wrapper').insertBefore(
        document.getElementById(columnElementId`${newColElIdx}`).parentElement,
        document.getElementById(columnElementId`${colElIdx}`).parentElement
      );
      document.getElementById(columnElementId`${newColElIdx}`).getElementsByTagName('iframe')[0].src = props.columnList[newColElIdx].url;
    } else {
      document.getElementById('wrapper').insertBefore(
        document.getElementById(columnElementId`${colElIdx}`).parentElement,
        document.getElementById(columnElementId`${0}`).parentElement
      );
      document.getElementById(columnElementId`${colElIdx}`).getElementsByTagName('iframe')[0].src = props.columnList[colElIdx].url;
      newColElIdx -= props.columnList.length;
    }
    // Update column list
    let tmp = props.columnList[colElIdx];
    props.columnList[colElIdx] = props.columnList[newColElIdx];
    props.columnList[newColElIdx] = tmp;
    // Update element id
    updateElementID();
    // Save column
    saveColumns(props.columnList);
    // Rerender deck
    props.rerender(Math.random());
  }

  const onClickDuplicateButton = () => {
    // Add column
    let newColumnConfig = cloneDeep(props.columnCofig);
    let col = document.createElement('div');
    ReactDOM.render(<Column
      rerender={props.rerender}
      columnList={props.columnList}
      columnIndex={props.columnList.length}
      columnCofig={newColumnConfig}
      columnElement={col}
    />, col);
    document.getElementById('wrapper').appendChild(col);
    // Fix slack dom
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';
    // Push to columnList
    props.columnList.push(newColumnConfig);
    // Save current column state
    saveColumns(props.columnList);
    // Rerender deck
    props.rerender(Math.random());
  }

  const onChangeWidthOption = (e) => {
    props.columnCofig.width = e.target.value;
    let colElIdx = exttractColumnIdxFromId(e.target.id);
    let _col = document.getElementsByClassName('column')[colElIdx] as HTMLElement;
    _col.style.minWidth = e.target.value;
    _col.style.width = e.target.value;
  }

  const onClickDeleteButton = () => {
    // Remove
    let colElIdx = exttractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    props.columnList.splice(colElIdx, 1);;
    saveColumns(props.columnList);
    props.columnElement.remove();
    // Update other elements
    updateElementID();
    // Rerender deck
    props.rerender(Math.random());
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
        ><FontAwesomeIcon icon={faChevronLeft} /></Button>
        <Button
          id={columnMoveRightButtonId`${props.columnIndex}`}
          className="btn btn-primary col-mv-r-btn"
          onClick={onClickMoveRightButton}
        ><FontAwesomeIcon icon={faChevronRight} /></Button>
        <Button
          id={columnDuplicateButtonId`${props.columnIndex}`}
          className="btn btn-primary col-dup-btn"
          onClick={onClickDuplicateButton}
        ><FontAwesomeIcon icon={faClone} /></Button>
        <Form.Control
          id={columnNameInputId`${props.columnIndex}`}
          className="col-name-input"
          type="text"
          value={colName}
          onChange={(e) => setColName(e.target.value)}
        />
        <Form.Select
          id={columnWidthSelectId`${props.columnIndex}`}
          className="w-auto col-width-select"
          onChange={(e) => onChangeWidthOption(e)}
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
        ><FontAwesomeIcon icon={faTimes} /></Button>
      </div>
      <iframe
        id={columnIframeId`${props.columnIndex}`}
        className={"col-iframe"}
        src={props.columnCofig.url}
      />
    </div >
  )
}