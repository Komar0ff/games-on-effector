import React from 'react';
import './Block.css';

function Block({ value, color, size, position, merged, isNew }) {
  return (
    <div
      style={{
        backgroundColor: color,
        zIndex: merged ? '20' : '1',
        width: `${size.block}px`,
        height: `${size.block}px`,
        fontSize: `${size.block / 2.5}px`,
        lineHeight: `${size.block}px`,
        left: `${(position.x * (size.block + size.margin)) + size.margin}px`,
        top: `${(position.y * (size.block + size.margin)) + size.margin}px`,
        // transform: `translate(
        //   ${position.x * (size.block + size.margin)}px,
        //   ${position.y * (size.block + size.margin)}px
        // )`,
      }}
      className={`game-block ${isNew ? 'new-block' : ''} ${merged ? 'merged-block' : ''}`}
    >
      <span>{value > 512 ? `${Math.floor(value / 1000)}K` : value} </span>
    </div>
  );
}

Block.propTypes = {
  value: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.instanceOf(null)],
  ),
  color: React.PropTypes.string,
  merged: React.PropTypes.bool,
  isNew: React.PropTypes.bool,
  size: React.PropTypes.shape({
    block: React.PropTypes.number,
    margin: React.PropTypes.number,
  }),
  position: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }).isRequired,
};

Block.defaultProps = {
  value: null,
  merged: false,
  isNew: false,
  color: '#4CAF50',
  size: {
    block: 100,
    margin: 10,
  },
};

export default Block;
