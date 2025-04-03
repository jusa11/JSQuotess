export const filterQuotes = (qoutes, text, filter) => {
  return qoutes.filter((quote) => {
    const matchesText = quote.text.toLowerCase().includes(text.toLowerCase());

    const matchesAuthor = quote.author
      .toLowerCase()
      .includes(filter.toLowerCase());
    return matchesText && matchesAuthor;
  });
};
