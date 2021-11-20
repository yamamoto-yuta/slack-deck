import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import { ColumnConfig, DEFAULT_WIDTH_OPTION, WIDTH_OPTION_LIST } from "../Contract";
import { saveColumns } from "../functions/column";
import { Column } from "./Column";

const columnNameDefaultValue = (_: TemplateStringsArray, columnIndex: number) => `Column ${columnIndex}`;

export const AddColumnModal: React.FC<{
  show: boolean,
  onHide: () => void,
  columnList: Array<ColumnConfig>,
}> = (props) => {
  const [newColumnConfig, setNewColumnConfig] = React.useState<ColumnConfig>({
    width: DEFAULT_WIDTH_OPTION.value,
    url: "",
    name: ""
  });

  React.useEffect(() => {
    setNewColumnConfig({ ...newColumnConfig, name: columnNameDefaultValue`${props.columnList.length}` });
  }, [props.show]);

  const onClickAddButton = () => {
    // Add column
    let col = document.createElement('div');
    ReactDOM.render(<Column
      columnList={props.columnList}
      columnIndex={props.columnList.length}
      columnCofig={newColumnConfig}
    />, col);
    document.getElementById('wrapper').appendChild(col);
    // Fix slack dom
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';
    // Push to columnList
    props.columnList.push(newColumnConfig);
    // Save current column state
    saveColumns(props.columnList);
    // Close Mordal
    props.onHide();
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.onHide} centered className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Add new column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the column width and URL of the column you want to add.</p>
          <Form className="d-flex">
            <Form.Select
              className="w-auto mx-1"
              onChange={(e) => setNewColumnConfig({ ...newColumnConfig, width: e.target.value })}
            >
              {WIDTH_OPTION_LIST.map((option) => (
                <option
                  value={option.value}
                  selected={DEFAULT_WIDTH_OPTION.value === option.value}
                >{option.text}</option>
              ))}
            </Form.Select>
            <Form.Control
              type="text"
              className="mx-1"
              placeholder="https://app.slack.com/client/*"
              onChange={(e) => setNewColumnConfig({ ...newColumnConfig, url: e.target.value })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onClickAddButton()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};