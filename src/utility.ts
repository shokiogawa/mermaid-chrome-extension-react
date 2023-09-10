export const idGenerator = (function* () {
  let i = 1;
  while (true) {
    yield `mermaid-${i}`;
    ++i;
  }
})();

export const wildcardToRegex = (wildcard: string) => {
  // アスタリスク(*)を正規表現の「任意の文字列」に変換
  // クエスチョンマーク(?)を正規表現の「任意の1文字」に変換
  const regex = wildcard.replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${regex}$`);
};
