export const getNameOfScoreField = size => `${size.width}-${size.height}`;

export const newBestScores = (bestScores, score, size) => {
  const nameOfScoreField = getNameOfScoreField(size);
  if (!bestScores[nameOfScoreField] || score > bestScores[nameOfScoreField]) {
    return {
      ...bestScores,
      [nameOfScoreField]: score,
    };
  }

  return bestScores;
};

export default newBestScores;
