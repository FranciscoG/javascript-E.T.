import typescript from '@rollup/plugin-typescript';

export default {
  input: "src/vcs.ts",
  output: {
    file: "dist/vcs.js",
    format: "umd",
    name: "vcs",
    sourcemap: true
  },
  plugins: [typescript()]
};
