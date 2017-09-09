import { eq, random, find, findIndex, cloneDeep } from 'lodash';
import { GAME_STATUS, VECTORS } from '../constants';

/* eslint-disable no-param-reassign */

const getEmptyBlocks = (size) => {
  const blocks = [];
  for (let x = 0; x < size.width; x += 1) {
    for (let y = 0; y < size.height; y += 1) {
      blocks.push({ x, y });
    }
  }

  return blocks;
};


const getNewBlocksState = (blocks) => {
  const randIndex = random(blocks.empty.length - 1);

  return {
    active: [...blocks.active, {
      position: blocks.empty[randIndex],
      value: Math.random() > 0.9 ? 4 : 2,
      id: blocks.nextId,
      new: true,
    }],
    empty: [...blocks.empty.slice(0, randIndex), ...blocks.empty.slice(randIndex + 1)],
    nextId: blocks.nextId + 1,
  };
};

const isInField = (position, size) => position.x >= 0 &&
                                           position.y >= 0 &&
                                           position.x < size.width &&
                                           position.y < size.height;

const getBlock = (blocks, position) => {
  let index = 0;
  const foundBlocks = [];
  while (index < blocks.length) {
    index = findIndex(blocks, { position }, index);
    if (index === -1) {
      index = blocks.length;
    } else {
      foundBlocks.push(blocks[index]);
      index += 1;
    }
  }

  if (foundBlocks.length > 1) {
    return find(foundBlocks, { position, merged: true });
  }
  return foundBlocks[0];
};

const isExistMergedCopy = (blocks, position) => !!find(blocks, { position, merged: true });

const setBlock = (blocks, position, block) => {
  const index = findIndex(blocks, position);
  return [...blocks.slice(0, index), block, ...blocks.slice(index + 1)];
};

const isBlockAvailable = (blocks, position) => {
  const block = getBlock(blocks, position);
  return !block;
};

const getFarthestPosition = (blocks, size, position, vector) => { // eslint-disable-line
  let previos;
  do {
    previos = position;
    position = { x: previos.x + vector.x, y: previos.y + vector.y };
  } while (
      isBlockAvailable(blocks, position) &&
      isInField(position, size)
    );

  return {
    farthest: previos,
    next: getBlock(blocks, position),
  };
};

const buildTraversals = (fieldSize, vector) => {
  const traversals = { x: [], y: [] };

  for (let x = 0; x < fieldSize.width; ++x) traversals.x.push(x); // eslint-disable-line
  for (let y = 0; y < fieldSize.height; ++y) traversals.y.push(y); // eslint-disable-line

  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

const normalize = blocks =>
  blocks.filter(block => block.merged || !isExistMergedCopy(blocks, block.position))
        .map(block => ({ ...block, merged: false, new: false }));

const isExitAvailableBlock = emptyBlocks => !!emptyBlocks.length;

const isExitBlocksForMerdge = (blocks) => {
  const vectorKeys = Object.keys(VECTORS);
  let sideBlock;
  for (let block of blocks) {  // eslint-disable-line
    for (let vectorKey of vectorKeys) { // eslint-disable-line
      sideBlock = getBlock(blocks, {
        x: block.position.x + VECTORS[vectorKey].x,
        y: block.position.y + VECTORS[vectorKey].y,
      });
      if (
        sideBlock &&
        (!isExistMergedCopy(blocks, sideBlock.position) || sideBlock.merged) &&
        (!isExistMergedCopy(blocks, block.position) || block.merged) &&
        sideBlock.value === block.value
      ) {
        return true;
      }
    }
  }

  return false;
};

const isGameEnd = (blocks) => {
  if (isExitAvailableBlock(blocks.empty) || isExitBlocksForMerdge(blocks.active)) return false;
  return true;
};

export const getNewBlocksAfterKeyPress = (state, vector) => {
  const newState = cloneDeep(state);
  let { blocks } = newState;
  const { size } = newState;
  const traversals = buildTraversals(size, vector);
  let currentBlock;
  let positions;
  let next;
  let moved = false;

  blocks.active = normalize(blocks.active);

  traversals.x.forEach((x) => {
    traversals.y.forEach((y) => {
      currentBlock = getBlock(blocks.active, { x, y });
      if (currentBlock) {
        positions = getFarthestPosition(blocks.active, size, currentBlock.position, vector);
        next = positions.next;

        if (next && next.value === currentBlock.value && !next.merged) {
          let newActiveBlocks;
          const newValue = next.value * 2;
          blocks.empty = [...blocks.empty, currentBlock.position];

          newActiveBlocks = setBlock(blocks.active, { position: next.position }, {
            ...next, value: newValue, merged: true,
          });
          newActiveBlocks = setBlock(newActiveBlocks, { position: currentBlock.position }, {
            ...currentBlock, position: next.position,
          });
          blocks.active = newActiveBlocks;
          newState.score += newValue;
          // if (newState.score > newState.bestScore) newState.bestScore = newState.score;
          moved = true;

          if (newValue === 2048 && !newState.isWon) {
            newState.status = GAME_STATUS.WIN;
            newState.isWon = true;
          }
        } else if (!eq(positions.farthest, currentBlock.position)) {
          blocks.empty = setBlock(blocks.empty, positions.farthest, currentBlock.position);
          blocks.active = setBlock(blocks.active, { position: currentBlock.position }, {
            ...currentBlock, position: positions.farthest,
          });
          moved = true;
        }
      }
    });
  });

  if (moved) {
    newState.history = [...newState.history.slice(-2), {
      blocks: state.blocks, score: state.score,
    }];
    blocks = getNewBlocksState(blocks);
    if (isGameEnd(blocks)) newState.status = GAME_STATUS.LOSE;
  }

  return {
    ...newState,
    blocks: {
      ...blocks,
    },
  };
};

export const getNewGameState = (settings) => {
  const state = {
    size: { ...settings },
    blocks: {
      active: [],
      empty: [],
      nextId: 0,
    },
    score: 0,
    isWon: false,
    status: GAME_STATUS.PLAY,
    history: [],
  };

  state.blocks.empty = getEmptyBlocks(state.size);

  state.blocks = getNewBlocksState(state.blocks);
  state.blocks = getNewBlocksState(state.blocks);

  return state;
};

export default { getNewBlocksAfterKeyPress, getNewGameState };
