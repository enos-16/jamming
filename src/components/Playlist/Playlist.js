import React, {Component} from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/TrackList.js';

class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
                <a className="Playlist-save">SAVE TO SPOTIFY</a>

            </div>
        );
    }
}

export default Playlist;