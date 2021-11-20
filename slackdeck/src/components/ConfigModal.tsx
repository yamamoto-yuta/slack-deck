import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { GeneralConfig } from "../Contract";

export const ConfigModal: React.FC<{
  show: boolean,
  onHide: () => void,
  currentGeneralConfig: GeneralConfig,
  setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>
}> = (props) => {
  const [updatedGeneralConfig, setUpdatedGeneralConfig] = React.useState<GeneralConfig>(props.currentGeneralConfig);

  React.useEffect(() => {
    setUpdatedGeneralConfig(props.currentGeneralConfig);
  }, [props.show]);

  const onClickSaveButton = () => {
    props.setGeneralConfig(updatedGeneralConfig);
    // Save config
    chrome.storage.sync.set({ 'generalConfig': updatedGeneralConfig });
    // Hide modal
    props.onHide();
    // Adapt config
    document.getElementById('mainBody').classList.toggle('text-light');
    document.getElementById('newBody').classList.toggle('text-light');
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.onHide} centered className="text-dark">
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
                  onChange={(e) => setUpdatedGeneralConfig({ useDarkTheme: e.target.checked })}
                /></div>

            </Form.Group>
          </Form>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onClickSaveButton()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};