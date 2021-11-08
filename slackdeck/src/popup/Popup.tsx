import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { } from '@fortawesome/free-solid-svg-icons'
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="m-3">
      <h6>SlackDeck</h6>
      <div>
        <ul>
          <li><a href="https://github.com/yamamoto-yuta/slack-deck" target="_blank">Repository</a></li>
        </ul>
      </div>
    </div>
  );
}
