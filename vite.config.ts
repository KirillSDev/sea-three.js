import { defineConfig, PluginOption, UserConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

const plugins: PluginOption = [glsl()];
const config: UserConfig = {
    server: {
        port: 3000,
    },
    plugins,
    build: {
        rollupOptions: {
            input: './src/index.ts'
        },
        outDir: 'dist'
    }
}
export default defineConfig(config);