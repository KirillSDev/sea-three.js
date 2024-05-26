import { defineConfig, UserConfig } from 'vite';

const config: UserConfig = {
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: './src/index.ts'
        },
        outDir: 'dist'
    }
}
export default defineConfig(config);