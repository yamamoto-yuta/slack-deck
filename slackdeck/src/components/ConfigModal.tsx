import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { CLIENT_URL_PATTERN, GeneralConfig, SlackUrlConverter, SlackUrlValidateResult, ValidationResult, VALIDATION_FAILED, VALIDATION_SUCCESS, WORKSPACE_URL_PATTERN } from "../Contract";

const workspaceUrlInputName = (_: TemplateStringsArray, index: number) => `input-workspace-url-${index}`;
const clientUrlInputName = (_: TemplateStringsArray, index: number) => `input-client-url-${index}`;
const extractUrlInputIndexFromName = (urlInput: string) => parseInt(urlInput.split('-').slice(-1)[0]);

export const ConfigModal: React.FC<{
  show: boolean,
  onHide: () => void,
  currentGeneralConfig: GeneralConfig,
  setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>
}> = (props) => {
  const [updatedGeneralConfig, setUpdatedGeneralConfig] = React.useState<GeneralConfig>(props.currentGeneralConfig);
  const [validateUrl, setValidateUrl] = React.useState<SlackUrlValidateResult[]>([]);
  const [isValidAllUrl, setIsValidAllUrl] = React.useState<boolean>(false);

  React.useEffect(() => {
    setUpdatedGeneralConfig(props.currentGeneralConfig);

    let validationResult: SlackUrlValidateResult[] = [];
    for (let converter of props.currentGeneralConfig.slackUrlTable) {
      validationResult.push({
        workspaceUrl: urlValidator(new RegExp(`${WORKSPACE_URL_PATTERN}$`), converter.workspaceUrl),
        clientUrl: urlValidator(new RegExp(`${CLIENT_URL_PATTERN}$`), converter.clientUrl),
      });
    }
    setValidateUrl(validationResult);

    setIsValidAllUrl(true);

  }, [props.show]);

  const urlValidator = (regex: RegExp, url: string) => {
    if (regex.test(url)) {
      return VALIDATION_SUCCESS;
    } else {
      return VALIDATION_FAILED;
    }
  };

  const isValidAllSlackUrl = () => {
    for (let result of validateUrl) {
      if (!result.workspaceUrl.isValid || !result.clientUrl.isValid) {
        return false;
      }
    }
    return true;
  }

  const onChangeWorkspaceUrl = (workspaceUrl: string, index: number) => {
    // Validate
    let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    newSlackUrlValidateResult[index].workspaceUrl = urlValidator(
      new RegExp("^https://[a-z0-9]+[a-z0-9\-]+.slack.com/$"),
      workspaceUrl
    );
    setValidateUrl(newSlackUrlValidateResult);
    // Update state
    let newSlackUrlTable: SlackUrlConverter[] = updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable[index].workspaceUrl = workspaceUrl;
    setUpdatedGeneralConfig({ ...updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
    // Update All validation result
    setIsValidAllUrl(isValidAllSlackUrl());
  };

  const onChangeClientUrl = (clientUrl: string, index: number) => {
    // Validate
    let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    newSlackUrlValidateResult[index].clientUrl = urlValidator(
      new RegExp("^https://app.slack.com/client/[A-Z0-9]+/$"),
      clientUrl
    );
    setValidateUrl(newSlackUrlValidateResult);
    // Update state
    let newSlackUrlTable: SlackUrlConverter[] = updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable[index].clientUrl = clientUrl;
    setUpdatedGeneralConfig({ ...updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
    // Update All validation result
    setIsValidAllUrl(isValidAllSlackUrl());
  };

  const onClickAddSlackUrlInputFormButton = () => {
    // Update satate
    let newSlackUrlTable: SlackUrlConverter[] = updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable.push({ workspaceUrl: "", clientUrl: "" });
    setUpdatedGeneralConfig({ ...updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
    // Validate
    let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    newSlackUrlValidateResult.push({
      workspaceUrl: VALIDATION_FAILED,
      clientUrl: VALIDATION_FAILED,
    });
    setValidateUrl(newSlackUrlValidateResult);
    // Update All validation result
    setIsValidAllUrl(false);
  }

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
          <p>Correspond <code>https://[workspace_url].slack.com/</code> and <code>https://app.slack.com/client/*/</code>.</p>
          <div>
            {updatedGeneralConfig.slackUrlTable.map((converter, index) => {
              return (
                <div className="d-flex my-1">
                  <Form className="flex-fill">
                    <Form.Control
                      type="text"
                      name={workspaceUrlInputName`${index}`}
                      value={converter.workspaceUrl}
                      placeholder="https://[workspace_url].slack.com/"
                      onChange={(e) => onChangeWorkspaceUrl(e.target.value, extractUrlInputIndexFromName(e.target.name))}
                    />
                    <Form.Text className="text-danger">{validateUrl[index].workspaceUrl.message}</Form.Text>
                  </Form>
                  <Form className="flex-fill">
                    <Form.Control
                      type="text"
                      name={clientUrlInputName`${index}`}
                      className="flex-fill"
                      value={converter.clientUrl}
                      placeholder="https://app.slack.com/client/XXXXXXXXXXX/"
                      onChange={(e) => onChangeClientUrl(e.target.value, extractUrlInputIndexFromName(e.target.name))}
                    />
                    <Form.Text className="text-danger">{validateUrl[index].clientUrl.message}</Form.Text>
                  </Form>
                  <Button
                    variant="danger"
                  // onClick={onClickSaveButton}
                  >
                    -
                  </Button>
                </div>
              )
            })}
          </div>
          <Button
            variant="primary"
            onClick={onClickAddSlackUrlInputFormButton}
          >
            +
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!(isValidAllUrl)}
            onClick={onClickSaveButton}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};