import { clientConfiguration } from 'universal-webpack'
import configuration from './webpack.config'

export default function (options) {
  return clientConfiguration(configuration, {}, options)
}
