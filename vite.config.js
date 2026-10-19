import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({build:{rollupOptions:{input:{web:resolve(process.cwd(),'index.html'),cliente:resolve(process.cwd(),'cliente/index.html'),gestor:resolve(process.cwd(),'gestor/index.html')}}}});
