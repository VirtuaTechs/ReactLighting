import * as React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';

export class UI extends React.Component {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (
            <div id='OptionsContainer'>
                <div id='Options'>
                    <li> Option 1</li>
                    <li> Option 2</li>
                    <li> Option 3</li>
                    <li> Option 4</li>
                    <li> Option 5</li>
                </div>
            </div>
        )
    }
}

export default UI;