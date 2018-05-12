import React from 'react';
import { connect } from 'react-redux';
import { Slider } from '@blueprintjs/core';
import { random } from 'lodash';

import actions from '../../actions';

import Grid from '../Grid';
import showToast from '../Toast';

import './Settings.css';

const RANGE_OF_SIZE = {
  GRID: {
    MAX: 12,
    MIN: 3,
  },
  BLOCK: {
    MAX: 100,
    MIN: 20,
  },
};

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.setWidth = this.setWidth.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.setBlockSize = this.setBlockSize.bind(this);
    this.setRandomSettings = this.setRandomSettings.bind(this);
    this.saveSettings = this.saveSettings.bind(this);

    this.state = {
      width: props.width,
      height: props.height,
      blockSize: props.blockSize,
    };
  }

  setWidth(width) {
    this.setState({ ...this.state, width });
  }

  setHeight(height) {
    this.setState({ ...this.state, height });
  }

  setBlockSize(blockSize) {
    this.setState({ ...this.state, blockSize });
  }

  setRandomSettings() {
    this.setState({
      width: random(RANGE_OF_SIZE.GRID.MIN, RANGE_OF_SIZE.GRID.MAX),
      height: random(RANGE_OF_SIZE.GRID.MIN, RANGE_OF_SIZE.GRID.MAX),
      blockSize: random(RANGE_OF_SIZE.BLOCK.MIN, RANGE_OF_SIZE.BLOCK.MAX),
    });
  }

  saveSettings() {
    this.props.saveSettings({ ...this.state, borderWidth: this.state.blockSize / 10 });
    showToast('Settings was successfuly updated');
  }

  render() {
    const sliderSetting = {
      max: RANGE_OF_SIZE.GRID.MAX,
      min: RANGE_OF_SIZE.GRID.MIN,
      labelStepSize: 1,
      renderLabel: true,
      stepSize: 1,
    };
    return (
      <div className="Settings">
        <div className="cards">
          <div className="pt-card">
            <h2>Width</h2>
            <Slider
              {...sliderSetting}
              value={this.state.width}
              onChange={this.setWidth}
            />
          </div>
          <div className="pt-card">
            <h2>Height</h2>
            <Slider
              {...sliderSetting}
              value={this.state.height}
              onChange={this.setHeight}
            />
          </div>
          <div className="pt-card">
            <h2>Size of tile</h2>
            <Slider
              max={RANGE_OF_SIZE.BLOCK.MAX}
              min={RANGE_OF_SIZE.BLOCK.MIN}
              labelStepSize={10}
              renderLabel
              stepSize={1}
              value={this.state.blockSize}
              onChange={this.setBlockSize}
            />
          </div>
          <div className="pt-card">
            <div className="pt-callout pt-intent-primary pt-icon-info-sign">
              <p>For apply new settings click <strong>save</strong> button and start new game</p>
              <p>You can see preview below</p>
            </div>
            <button
              className="pt-button pt-icon-floppy-disk pt-intent-primary"
              onClick={this.saveSettings}
            >
              Save
            </button>
            <button
              className="pt-button pt-icon-random pt-intent-primary"
              onClick={this.setRandomSettings}
            >
              Random setting
            </button>
          </div>
        </div>
        <div className="preview">
          <h1>Preview</h1>
          <Grid
            game={{
              size: {
                ...this.state,
                borderWidth: this.state.blockSize / 10,
              },
              blocks: {
                active: [],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  blockSize: React.PropTypes.number.isRequired,

  saveSettings: React.PropTypes.func.isRequired,
};


export default connect(state => ({
  width: state.games.currentGame.size.width,
  height: state.games.currentGame.size.height,
  blockSize: state.games.currentGame.size.blockSize,
}), dispatch => ({
  saveSettings: s => dispatch(actions.changeSettings(s)),
}))(Settings);
