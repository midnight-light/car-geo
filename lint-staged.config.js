export default {
  '*.{ts,tsx}': ['prettier --write', 'eslint --fix', () => 'tsc -p tsconfig.json --noEmit'],
};
