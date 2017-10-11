import React, {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/*You will add a map method that renders a set of Track components*/}
                <p>Track One</p>
                <p>Track Two</p>
                <p>Track Three</p>
            </div>
        );
    }
}

export default TrackList;