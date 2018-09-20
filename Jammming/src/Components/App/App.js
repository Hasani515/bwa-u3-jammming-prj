import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      playlistName: 'playlistName',
      playlistTracks: []
    };
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      const newPlaylistTracks = this.state.playlistTracks.slice();
      newPlaylistTracks.push(track);
      this.setState({
        playlistTracks: newPlaylistTracks
      });
    }
  }

  removeTrack(track) {
    if (!this.state.playlistTracks.find(trackRemove =>
      trackRemove.id === track.id)) {
        return;
      } else {
        let newList = this.state.playlistTracks.filter(trackRemove =>
          trackRemove.id !== track.id);
          this.setState({
            playlistTracks : newList
          });
        }
      }

      updatePlaylistName(name) {
        this.setState({
          playlistName: name
        });
      }

      savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(track => {
          return track.uri;
        });
        Spotify.savePlaylist(this.state.playlistName,trackURIs);
        this.setState( {
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        console.log(trackURIs);
      }

      search(term) {
        Spotify.search(term).then(searchResults => {
          this.setState(
            {searchResults: searchResults});
          });
        }

        render() {
          return (
            <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
            <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
            </div>
            </div>
            </div>
          );
        }
      }

      export default App;
