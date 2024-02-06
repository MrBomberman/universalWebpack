import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options : BuildOptions){
    return {
        port: options.port ?? 3000,
        open: true,
        // если раздавать статике через nginx то надо делать проксирвоание через index.html
        historyApiFallback: true,
        hot: true
    } 
}