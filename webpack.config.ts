import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { buildPaths } from './config/build/types/config';
import path from 'path';

import { buildEnv } from './config/build/types/config';

export default (env: buildEnv) => {
  const paths: buildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
}


const mode = env.mode || 'development';
const isDev = mode === "development";
const PORT = 4000;

const config: webpack.Configuration = buildWebpackConfig({
  mode,
  paths,
  isDev,
  port: PORT,
})
  return  config 
};