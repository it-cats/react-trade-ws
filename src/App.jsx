import React from 'react';
import Statistic from './components/Statistics';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.socket = null;

    this.toggleSocket = this.toggleSocket.bind(this);
    this.statisticHandler = this.statisticHandler.bind(this);
    this.socketListener = this.socketListener.bind(this);

    // Around max available blob size for chrome
    const availableMemory = 2000000000;
    // Maximum array size
    // About 35-70h with speed ~500-1000 i/s
    this.limit = Math.round(availableMemory / 16);
    // Buffer for Int16Array
    this.buffer = new ArrayBuffer(this.limit * 16);
    // Array for all data from socket. Init in this.reset()
    this.array = null;
    // Current array position
    this.length = 0;
    // Lost counter
    this.lost = 0;

    this.state = {
      isSocketOn: false,
      isStatisticShow: false,
      data: [],
      length: 0,
      lost: 0
    }
  }

  reset = () => {
    this.array = new Int16Array(this.buffer);
    this.length = 0;
    this.lost = 0;

    this.setState({
      data: [],
      length: this.length,
      lost: this.lost
    });
  }
  /**
   *
   */
  toggleSocket() {
    if (!this.state.isSocketOn) {
      this.socket = new WebSocket('');
      this.reset();
      this.socket.addEventListener('message', this.socketListener);
    } else {
      // this.socket.removeEventListener('message', this.socketListener);
      this.socket = null;
    }

    this.setState({
      isSocketOn: !this.state.isSocketOn
    })
  }

  /**
   *
   */
  statisticHandler() {
    this.setState({
      isStatisticShow: true,
      length: this.length,
      data: this.array.slice(0, this.length),
      lost: this.lost
    })
  }

  /**
   *
   * @param event
   */
  socketListener(event) {
    if (this.length < this.limit) {
      this.array[this.length++] = JSON.parse(event.data).value;
    } else {
      this.lost++;
    }
  }

  render() {
    const statisticOutput = (this.state.isStatisticShow)
        ? <Statistic lost={this.state.lost} data={this.state.data} length={this.state.length} /> : '';

    return (
        <div className="app">
          <div className="app__controls controls">
            <button className="btn" onClick={this.toggleSocket}>{(this.state.isSocketOn ? 'Стоп' : 'Старт')}</button>
            <button className={(!this.state.isSocketOn ? 'disabled btn' : 'btn')} onClick={this.statisticHandler}>Статистика</button>
          </div>
          {statisticOutput}
        </div>
    );
  }
}

export default App;
