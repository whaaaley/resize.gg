
const production = process.env.NODE_ENV === 'production'
const year = new Date().getFullYear()

const jsx = {
  inject: [
    './src/modules/pocket/shim.js'
  ],
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
  loader: {
    '.js': 'jsx'
  }
}

module.exports = {
  esbuild: {
    js: {
      ...jsx,
      bundle: true,
      nodePaths: [
        'src/modules'
      ],
      sourcemap: true,
      write: false,
      define: {
        'process.env.PROD': production,
        'process.env.STATIC': false,
        'process.env.YEAR': year
      }
    },
    html: {
      ...jsx,
      bundle: true,
      nodePaths: [
        'src/modules'
      ],
      platform: 'node',
      write: false,
      define: {
        'process.env.PROD': production,
        'process.env.STATIC': true,
        'process.env.YEAR': year
      }
    }
  },
  typescript: {
    compilerOptions: {
      allowJs: true,
      lib: [
        'DOM',
        'ES2015'
      ],
      target: 'ES5'
    }
  },
  uglify: {
    toplevel: true,
    compress: {
      drop_console: true,
      passes: 3
    },
    mangle: {
      toplevel: true
    }
  },
  sass: {
    includePaths: [
      'node_modules'
    ],
    sourceMap: process.cwd() + '/src',
    sourceMapContents: true,
    sourceMapEmbed: true
  },
  cleancss: {
    level: 2
  }
}
