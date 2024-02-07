import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions) : Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
         // подставляет скрипты в наш index.html
         new HtmlWebpackPlugin({template: paths.html,
         favicon: path.resolve(paths.public, 'favicon.ico')}), // template - ссылка html файла, который будет использоваться в качестве шаблона
         new DefinePlugin({
            __PLATFORM__ : JSON.stringify(platform)
         }),
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
        // выносит проверку типов в отдельный процесс, не нагружаем сборку
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin()) // для правильной работы hmr
    }

    if(isProd){
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
        plugins.push(new CopyPlugin({
            patterns: [
              { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
            ],
        }))
    }

    if(analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins
}