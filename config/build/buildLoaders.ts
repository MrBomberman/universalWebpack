import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildBabelLoaders } from "./babel/buildBabelLoaders";

export function buildLoaders(options: BuildOptions) : ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          }
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          // Compiles Sass to CSS
          "sass-loader",
        ],
    }

    // const tsLoader = {
    //     // ts-loader умеет работать с jsx
    //     // если бы мы не использовали ts - нужен бы был babel-loader
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

    const tsLoader = {
        // ts-loader умеет работать с jsx
        // если бы мы не использовали ts - нужен бы был babel-loader
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean), 
                // для правильной работы hmr
              }),
            }
          }
        ]
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ 
            loader: '@svgr/webpack', 
            options: { 
                icon: true,
                svgoConfig: {
                    plugins: [ // этот плагин дает возможность менять цвет svg используя inline style color
                        {
                            name: 'convertColors',
                            params: {
                                currentColor:  true
                            }
                        }
                    ]
                }
            } // дает возможность работать с svg файлами как с иконками
        }],
    }

    const babelLoader = buildBabelLoaders(options)

    return [
        scssLoader,
        babelLoader,
        // tsLoader,
        assetLoader,
        svgrLoader
    ]
}

function ReactRefreshTypeScript() {
    throw new Error("Function not implemented.");
}
