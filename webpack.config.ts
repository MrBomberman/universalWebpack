import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = 'production' | 'development'

interface EnvVariables {
    mode: Mode,
    port: number
}

export default (env: EnvVariables) => {

    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'), // путь к точке входа в приложение, точек входа в приложение может быть несколько
        output: { // указываем куда сборка будет происходить
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            // подставляет скрипты в наш index.html
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}), // template - ссылка html файла, который будет использоваться в качестве шаблона
            isDev && new webpack.ProgressPlugin()
        ].filter(Boolean),
        module: {
            rules: [
              {
                // ts-loader умеет работать с jsx
                // если бы мы не использовали ts - нужен бы был babel-loader
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true
        } : undefined
    };
    return config
};