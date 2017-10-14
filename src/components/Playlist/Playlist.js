import React, {Component} from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/TrackList.js';

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event) {
        this.props.onNameChange(event);
    }
    
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
                <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>

            </div>
        );
    }
}

export default Playlist;