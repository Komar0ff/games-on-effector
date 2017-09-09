import React from 'react';
import './Grid.css';
import Block from '../Block/';

const colorScheme = {
  backgroundColor: '#ccc',
  2: '#f44336',
  4: '#E91E63',
  8: '#9C27B0',
  16: '#673AB7',
  32: '#3F51B5',
  64: '#2196F3',
  128: '#03A9F4',
  256: '#00BCD4',
  512: '#FFEB3B',
  1024: '#FFC107',
  2048: '#FF9800',
  4096: '#FF5722',
  8192: '#8BC34A',
  16384: '#4CAF50',
};


const getSize = (size, blockSize, borderWidth) => `${(blockSize * size) + (borderWidth * (size - 1))}px`;

const Grid = ({ game }) => {
  const emptyBlocks = [];
  for (let y = 0; y < game.size.height; ++y) { // eslint-disable-line
    for (let x = 0; x < game.size.width; ++x) { // eslint-disable-line
      emptyBlocks.push(
        <div
          className="Game-empty-block"
          key={`empty-${x}-${y}`}
          style={{
            top: (y * (game.size.blockSize + game.size.borderWidth)) + game.size.borderWidth,
            left: (x * (game.size.blockSize + game.size.borderWidth)) + game.size.borderWidth,
            width: game.size.blockSize,
            height: game.size.blockSize,
            backgroundColor: '#737373',
            position: 'absolute',
            borderRadius: '3px',
          }}
        />,
      );
    }
  }


  return (
    <div
      style={{
        padding: `${game.size.borderWidth}px`,
        backgroundColor: colorScheme.backgroundColor,
        width: getSize(game.size.width, game.size.blockSize, game.size.borderWidth),
        height: getSize(game.size.height, game.size.blockSize, game.size.borderWidth),
      }}
      className="Grid"
    >
      {emptyBlocks}
      {
        game.blocks.active.map(block => (
          (
            <Block
              key={block.id}
              size={{
                block: game.size.blockSize,
                margin: game.size.borderWidth,
              }}
              isNew={block.new}
              color={colorScheme[block.value]}
              value={block.value}
              position={block.position}
              merged={block.merged}
            />
          )
        ))
      }
    </div>);
};

Grid.propTypes = {
  game: React.PropTypes.shape({
    blocks: React.PropTypes.shape({
      active: React.PropTypes.array,
    }),
    size: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      blockSize: React.PropTypes.number,
      borderWidth: React.PropTypes.number,
    }),
  }).isRequired,

};

export default Grid;
