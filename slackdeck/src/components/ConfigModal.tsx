import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { GeneralConfig } from "../Contract";

export const ConfigModal: React.FC<{
  show: boolean,
  onHide: () => void,
  currentGeneralConfig: GeneralConfig,
  setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>
}> = (props) => {
  const [updatedGeneralConfig, setUpdatedGeneralConfig] = React.useState<GeneralConfig>(props.currentGeneralConfig);
  const [validateUrl, setValidateUrl] = React.useState<{
    workspaceUrl: { isValid: boolean, message: string },
    clientUrl: { isValid: boolean, message: string },
  }>({
    workspaceUrl: { isValid: false, message: "Does not match format." },
    clientUrl: { isValid: false, message: "Does not match format." },
  });

  React.useEffect(() => {
    setUpdatedGeneralConfig(props.currentGeneralConfig);
    setValidateUrl({
      workspaceUrl: urlValidator(new RegExp("^https://[a-z0-9]+[a-z0-9\-]+.slack.com/$"), props.currentGeneralConfig.workspaceUrl),
      clientUrl: urlValidator(new RegExp("^https://app.slack.com/client/[A-Z0-9]+/$"), props.currentGeneralConfig.clientUrl),
    });
  }, [props.show]);

  const urlValidator = (regex: RegExp, url: string) => {
    if (regex.test(url)) {
      return { isValid: true, message: "" };
    } else {
      return { isValid: false, message: "Does not match format." };
    }
  };

  const onChangeWorkspaceUrl = (workspaceUrl: string) => {
    setValidateUrl({
      ...validateUrl, workspaceUrl: urlValidator(
        new RegExp("^https://[a-z0-9]+[a-z0-9\-]+.slack.com/$"),
        workspaceUrl
      )
    });
    setUpdatedGeneralConfig({ ...updatedGeneralConfig, workspaceUrl: workspaceUrl });
  };

  const onChangeClientUrl = (clientUrl: string) => {
    setValidateUrl({
      ...validateUrl, clientUrl: urlValidator(
        new RegExp("^https://app.slack.com/client/[A-Z0-9]+/$"),
        clientUrl
      )
    });
    setUpdatedGeneralConfig({ ...updatedGeneralConfig, clientUrl: clientUrl });
  };

  const onClickSaveButton = () => {
    props.setGeneralConfig(updatedGeneralConfig);
    // Save config
    chrome.storage.sync.set({ 'generalConfig': updatedGeneralConfig });
    // Hide modal
    props.onHide();
    // Adapt config
    document.getElementById('mainBody').classList.toggle('text-light');
    document.getElementById('newBody').classList.toggle('text-light');
  };

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
          <Modal.Title>Config</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Use dark theme</h5>
          <p>Check this box if you want to use the dark theme in Slack.</p>
          <Form>
            <Form.Group>
              <div className="mb-3">
                <Form.Check
                  type={"checkbox"}
                  checked={updatedGeneralConfig.useDarkTheme}
                  label={"Use dark theme"}
                  onChange={(e) => setUpdatedGeneralConfig({ ...updatedGeneralConfig, useDarkTheme: e.target.checked })}
                /></div>
            </Form.Group>
          </Form>
          <hr />
          <h5>Register workspace URL</h5>
          <p>Correspond <code>https://[workspace_url].slack.com/</code> to <code>"https://app.slack.com/client/*/</code>.</p>
          <Row>
            <Col>
              <Form>
                <Form.Control
                  type="text"
                  value={updatedGeneralConfig.workspaceUrl}
                  placeholder="https://[workspace_url].slack.com/"
                  onChange={(e) => onChangeWorkspaceUrl(e.target.value)}
                />
                <Form.Text className="text-danger">{validateUrl.workspaceUrl.message}</Form.Text>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Control
                  type="text"
                  value={updatedGeneralConfig.clientUrl}
                  placeholder="https://app.slack.com/client/XXXXXXXXXXX/"
                  onChange={(e) => onChangeClientUrl(e.target.value)}
                />
                <Form.Text className="text-danger">{validateUrl.clientUrl.message}</Form.Text>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!(validateUrl.workspaceUrl.isValid && validateUrl.clientUrl.isValid)}
            onClick={onClickSaveButton}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};