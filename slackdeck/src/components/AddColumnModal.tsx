import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import { CHANNEL_ID_PATTERN, clientMessageIdRegex, CLIENT_MESSAGE_ID_PATTERN, ColumnConfig, DEFAULT_COLUMN_CONFIG, GeneralConfig, WIDTH_OPTION_LIST, WORKSPACE_MESSAGE_ID_PATTERN } from "../Contract";
import { saveColumns } from "../functions/column";
import { Column } from "./Column";

const columnNameDefaultValue = (_: TemplateStringsArray, columnIndex: number) => `Column ${columnIndex}`;

export const AddColumnModal: React.FC<{
  show: boolean,
  onHide: () => void,
  columnList: Array<ColumnConfig>,
  generalConfig: GeneralConfig,
  rerender: React.Dispatch<React.SetStateAction<number>>,
}> = (props) => {
  const [newColumnConfig, setNewColumnConfig] = React.useState<ColumnConfig>(DEFAULT_COLUMN_CONFIG);

  React.useEffect(() => {
    setNewColumnConfig({
      ...newColumnConfig,
      name: columnNameDefaultValue`${props.columnList.length}`,
      width: props.generalConfig.defaultColumnWidth
    });
  }, [props.show]);

  const convertWorkspaceUrlToClientUrl = (workspaceUrl: string, clientUrl: string, url: string) => {
    const workspaceUrlPattern = `^${workspaceUrl}archives/`;

    const workspaceChannelPattern = `${workspaceUrlPattern}${CHANNEL_ID_PATTERN}`;
    const workspaceMessagePattern = `${workspaceChannelPattern}/${WORKSPACE_MESSAGE_ID_PATTERN}`;
    const workspaceThredMessagePattern = `${workspaceMessagePattern}\\?thread_ts=${CLIENT_MESSAGE_ID_PATTERN}&cid=${CHANNEL_ID_PATTERN}`;
    const workspaceChannelRegex = new RegExp(workspaceChannelPattern);
    const extractChannelIdFromWorkspaceUrl = (workspaceUrl: string): string => workspaceChannelRegex.exec(workspaceUrl)[0].split("/").slice(-1)[0];
    const workspaceMessageRegex = new RegExp(workspaceMessagePattern);
    const extractMessageIdFromWorkspaceUrl = (workspaceUrl: string): string => workspaceMessageRegex.exec(workspaceUrl)[0].split("/").slice(-1)[0];
    const workspaceThreadMessageRegex = new RegExp(workspaceThredMessagePattern);
    const extractThreadMessageIdFromWorkspaceUrl = (workspaceUrl: string): string => clientMessageIdRegex.exec(workspaceThreadMessageRegex.exec(workspaceUrl)[0].split("?").slice(-1)[0])[0];

    if (workspaceThreadMessageRegex.test(url)) {
      const channelId = extractChannelIdFromWorkspaceUrl(url);
      const clientThreadMessageId = extractThreadMessageIdFromWorkspaceUrl(url);
      return `${clientUrl}${channelId}/thread/${channelId}-${clientThreadMessageId}`;
    } else if (workspaceMessageRegex.test(url)) {
      const channelId = extractChannelIdFromWorkspaceUrl(url);
      const workspaceMessageId = extractMessageIdFromWorkspaceUrl(url);
      const clientMessageId = `${workspaceMessageId.slice(1, 11)}.${workspaceMessageId.slice(11, 11 + 6)}`;
      return `${clientUrl}${channelId}/${clientMessageId}`;
    } else if (workspaceChannelRegex.test(url)) {
      const channelId = extractChannelIdFromWorkspaceUrl(url)
      return `${clientUrl}${channelId}`;
    } else {
      console.log("undefined url");
      return "";
    }
  }

  const onChangeUrl = (url: string) => {
    for (let converter of props.generalConfig.slackUrlTable) {
      const workspaceUrlPattern = `^${converter.workspaceUrl}archives/`;
      const workspaceUrlRegex = new RegExp(workspaceUrlPattern);
      if (workspaceUrlRegex.test(url)) {
        url = convertWorkspaceUrlToClientUrl(converter.workspaceUrl, converter.clientUrl, url);
      }
    }

    setNewColumnConfig({ ...newColumnConfig, url: url });
  }

  const onChangeColumnName = (name: string) => {
    setNewColumnConfig({ ...newColumnConfig, name: name });
  }

  const onClickAddButton = () => {
    // Add column
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://*"
                onChange={(e) => onChangeUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Column width</Form.Label>
              <Form.Select
                onChange={(e) => setNewColumnConfig({ ...newColumnConfig, width: e.target.value })}
              >
                {WIDTH_OPTION_LIST.map((option) => (
                  <option
                    value={option.value}
                    selected={props.generalConfig.defaultColumnWidth === option.value}
                  >{option.text}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Column name (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Column name"
                onChange={(e) => onChangeColumnName(e.target.value)}
              />
            </Form.Group>
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