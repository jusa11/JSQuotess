function RandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  return randomQuote;
}

module.exports = RandomQuote;
