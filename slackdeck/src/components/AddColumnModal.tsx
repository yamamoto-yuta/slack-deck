import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import { CHANNEL_ID_PATTERN, CLIENT_MESSAGE_ID_PATTERN, ColumnConfig, DEFAULT_WIDTH_OPTION, extractClientIdFromClientUrl, GeneralConfig, WIDTH_OPTION_LIST, WORKSPACE_MESSAGE_ID_PATTERN } from "../Contract";
import { saveColumns } from "../functions/column";
import { Column } from "./Column";

const columnNameDefaultValue = (_: TemplateStringsArray, columnIndex: number) => `Column ${columnIndex}`;

export const AddColumnModal: React.FC<{
  show: boolean,
  onHide: () => void,
  columnList: Array<ColumnConfig>,
  generalConfig: GeneralConfig,
}> = (props) => {
  const [newColumnConfig, setNewColumnConfig] = React.useState<ColumnConfig>({
    width: DEFAULT_WIDTH_OPTION.value,
    url: "",
    name: ""
  });

  React.useEffect(() => {
    setNewColumnConfig({ ...newColumnConfig, name: columnNameDefaultValue`${props.columnList.length}` });
  }, [props.show]);

  const onChangeUrl = (url: string) => {
    // const regex = new RegExp("^https://[a-z0-9]+[a-z0-9\-]+.slack.com/archives/");
    // if (props.generalConfig.clientUrl.length > 0 && regex.test(url)) {
    //   let result = regex.exec(url);
    //   url = props.generalConfig.clientUrl + url.substr(result.index + result[0].length);
    // }
    const workspaceUrlPattern = `^${props.generalConfig.workspaceUrl}archives/`;
    const workspaceUrlRegex = new RegExp(workspaceUrlPattern);
    if (workspaceUrlRegex.test(url)) {
      const workspaceChannelPattern = `${workspaceUrlPattern}${CHANNEL_ID_PATTERN}`;
      const workspaceMessagePattern = `${workspaceChannelPattern}/${WORKSPACE_MESSAGE_ID_PATTERN}`;
      const workspaceThreadMessagePattern = `${workspaceMessagePattern}\\?thread_ts=${CLIENT_MESSAGE_ID_PATTERN}&cid=${CHANNEL_ID_PATTERN}`;
      const workspaceChannelRegex = new RegExp(workspaceChannelPattern);
      const workspaceMessageRegex = new RegExp(workspaceMessagePattern);
      const workspaceThreadMessageRegex = new RegExp(workspaceThreadMessagePattern);

      if (workspaceThreadMessageRegex.test(url)) {
        console.log("thred url");
      } else if (workspaceMessageRegex.test(url)) {
        console.log("message url");
      } else if (workspaceChannelRegex.test(url)) {
        console.log("channel url");
      } else {
        console.log("undefined url");
      }
    }
    console.log(url);
    setNewColumnConfig({ ...newColumnConfig, url: url })
  }

  const onClickAddButton = () => {
    // Add column
    let col = document.createElement('div');
    ReactDOM.render(<Column
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
    // Close Mordal
    props.onHide();
  }

  return (
    <div>
      <Modal
        className="text-dark"
        size="lg"
        show={props.show}
        onHide={props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the column width and URL of the column you want to add.</p>
          <p>Enterable URLs:</p>
          <ul>
            <li><code>https://[workspace_url].slack.com/archives/[channel_id]/</code></li>
            <li><code>https://app.slack.com/client/[workspace_id]/[channel_id]/</code></li>
          </ul>
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
              placeholder="https://*"
              onChange={(e) => onChangeUrl(e.target.value)}
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