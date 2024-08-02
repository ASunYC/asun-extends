import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';

export default [
    {
        input: './src/index.ts',
        output: [{
            format: 'cjs',
            file: './dist/index.js',
            banner: require('./scripts/copyright')
        }],
        plugins: [
            resolve({
                // 使 Node.js 内建模块可用
                modulesOnly: true
            }),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                        declarationMap: false,
                        module: "esnext"
                    }
                }
            })
        ],
        external: ['os', 'child_process'] // 将 Node.js 内建模块指定为外部依赖
    },
    {
        input: './src/index.ts',
        output: [{
            format: 'es',
            file: './dist/index.mjs',
            banner: require('./scripts/copyright')
        }],
        plugins: [
            resolve({
                // 使 Node.js 内建模块可用
                modulesOnly: true
            }),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                        declarationMap: false,
                        module: "esnext"
                    }
                }
            })
        ],
        external: ['os', 'child_process'] // 将 Node.js 内建模块指定为外部依赖
    }
]