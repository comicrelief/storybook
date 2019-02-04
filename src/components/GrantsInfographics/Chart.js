import React from 'react';
import propTypes from 'prop-types';
import { RadialChart } from 'react-vis';

const Chart = ({
  chartData, innerRadius,
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
      showLabels
      colorType="literal"
    />
  );
};

Chart.propTypes = {
  chartData: propTypes.array.isRequired,
  innerRadius: propTypes.string.isRequired,
};

export default Chart;
