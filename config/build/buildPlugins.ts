import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

export function buildPlugins({mode, paths}: BuildOptions) : Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
         // подставляет скрипты в наш index.html
         new HtmlWebpackPlugin({template: paths.html}), // template - ссылка html файла, который будет использоваться в качестве шаблона
         isDev && new webpack.ProgressPlugin(),
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
    }

    if(isProd){
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
    }
    return plugins
}