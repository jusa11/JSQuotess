import { v4 as uuid4 } from 'uuid';

const checkQuoteWithID = (quote, randomQuote) => {
  const checkQuote = quote.find(
    (q) => q.text === randomQuote.text && q.author === randomQuote.author
  );

  return checkQuote || { ...randomQuote, id: uuid4() };
};

export default checkQuoteWithID;
