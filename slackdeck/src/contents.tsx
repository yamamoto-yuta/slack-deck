import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';

import './contents.scss';

const Sidebar = () => {
    return (
        <div className="container-fluid my-3 text-center text-white">
            <button className="btn btn-primary rounded-circle"><FontAwesomeIcon icon={faPlus} className="sidebar-icon-large" /></button>
        </div>
    )
}

const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
sidebar.classList.add('bg-dark');

const body = document.body;
body.id = 'mainBody';

const newBody = document.createElement('body');
newBody.id = 'newBody';
newBody.appendChild(sidebar);
newBody.appendChild(body);
document.documentElement.appendChild(newBody);

ReactDOM.render(<Sidebar />, sidebar);