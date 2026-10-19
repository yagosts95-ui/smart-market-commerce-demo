import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({build:{rollupOptions:{input:{cliente:resolve(process.cwd(),'index.html'),gestor:resolve(process.cwd(),'gestor/index.html')}}}});
