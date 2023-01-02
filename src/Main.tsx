import * as React from 'react';
import ModelLoader from './modelLoader';
import UI from './UI';
import './style.css';

export class Main extends React.Component {
    private _modelLoader: any;

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div id="Main">
                <div id='three'>
                    <ModelLoader ref={(ref: any) => (this._modelLoader = ref)} />
                </div>
                <UI />
            </div>
        );
    }
}

export default Main;