import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React, { useEffect } from "react";
import "./Popup.scss";
import { VERSION } from "../shared/general";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="popupContainer">
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        subheader={
          <ListSubheader component="div">
            SlackDeck v{VERSION}
          </ListSubheader>
        }
      >
        <ListItemButton component="a" target="_blank" rel="noopener" href="https://github.com/yamamoto-yuta/slack-deck/releases">
          <ListItemIcon><HistoryIcon /></ListItemIcon>
          <ListItemText primary="Release Note" />
        </ListItemButton>
        <ListItemButton component="a" target="_blank" rel="noopener" href="https://github.com/yamamoto-yuta/slack-deck">
          <ListItemIcon><GitHubIcon /></ListItemIcon>
          <ListItemText primary="Repository" />
        </ListItemButton>
        <ListItemButton component="a" target="_blank" rel="noopener" href="https://chrome.google.com/webstore/detail/slackdeck/cocnkjpcbmoopfpmogblnjpjdfcaohod">
          <ListItemIcon><ShoppingBagIcon /></ListItemIcon>
          <ListItemText primary="Chrome Web Store" />
        </ListItemButton>
      </List>
    </div>
  )
}
