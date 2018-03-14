import React from 'react'
import PropTypes from 'prop-types'
import {RadialChart} from 'react-vis'

const Chart = ({
  chartData, innerRadius
}) => {
  return (
    <RadialChart
      className={'donut-chart-example'}
      innerRadius={innerRadius}
      radius={120}
      getAngle={d => d.theta}
      data={chartData}
      width={250}
      height={250}
      showLabels={true}
      colorType='literal'
      >
    </RadialChart>
  )
}

Chart.propTypes = {
  chartData: PropTypes.array,
  innerRadius: PropTypes.string,
}

export default Chart