import webpack from 'webpack'
import webpackConfig from '../../config/webpack.config.dev'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import paths from '../../config/paths'
import config from '../../config/server'
import { PassThrough } from 'stream'

export default function configureWebpack (api) {
  const compiler = webpack(webpackConfig)
  const webpackDevMiddleware = devMiddleware(
    compiler,
    {
      compress: true,
      clientLogLevel: 'none',
      contentBase: paths.appPublic,
      hot: true,
      stats: {
        colors: true
      },
      publicPath: webpackConfig.output.publicPath,
      quiet: true,
      watchOptions: {
        ignored: /node_modules/
      },
      https: false,
      host: config.host,
      historyApiFallback: true
    }
	)
  api.use((ctx, next) => {
    webpackDevMiddleware(ctx.req,
      {
        end: content => {
          ctx.body = content
        },
        setHeader: (...args) => {
          ctx.set.apply(ctx, args)
        }
      }, next
    )
  })

  api.use((ctx, next) => {
    if (ctx.req.url.indexOf('.') === -1 && ctx.req.url.indexOf('__webpack') === -1 && ctx.req.url.indexOf('api') === -1) {
      ctx.req.url = '/'
    }
    return next()
  })
  const webpackHotMiddleware = hotMiddleware(compiler, {})

  api.use(async (ctx, next) => {
    const pass = new PassThrough()
    ctx.body = pass
    webpackHotMiddleware(ctx.req, {
      write: pass.write.bind(pass),
      writeHead: (state, headers) => {
        ctx.state = state
        ctx.set(headers)
      }
    }, next)
  })
}
