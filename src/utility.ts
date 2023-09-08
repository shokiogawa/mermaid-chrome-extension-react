export const idGenerator = (function* () {
  let i = 1;
  while (true) {
    yield `mermaid-${i}`;
    ++i;
  }
})();
