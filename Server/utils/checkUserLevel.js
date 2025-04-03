const userLevels = require('./userLevels');

const checkUserLevel = (countQuote) => {
  let currentLevel;
  let titleLevel;
  let nextLevelCount;
  let needQuoteForNextLevel;
  let needQuoteForCurrnetLevel;

  if (countQuote >= userLevels[userLevels.length - 1].amount) {
    currentLevel = userLevels.length - 1;
    titleLevel = userLevels[currentLevel].title;
    nextLevelCount = null;
    needQuoteForNextLevel = 0;
    needQuoteForCurrnetLevel = 0;
  } else {
    for (let i = userLevels.length - 1; i >= 0; i--) {
      if (countQuote >= userLevels[i].amount) {
        currentLevel = i;
        nextLevelCount = userLevels[i + 1].amount;
        titleLevel = userLevels[i].title;
        needQuoteForNextLevel = nextLevelCount
          ? nextLevelCount - countQuote
          : 0;
        needQuoteForCurrnetLevel = userLevels[currentLevel + 1]
          ? userLevels[currentLevel + 1].amount - userLevels[i].amount
          : 0;
        break;
      }
    }
  }

  return {
    currentLevel,
    nextLevelCount,
    titleLevel,
    needQuoteForNextLevel,
    needQuoteForCurrnetLevel,
  };
};

module.exports = checkUserLevel;
