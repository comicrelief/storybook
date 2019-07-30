import React from 'react';
import propTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis';

const Bar = ({
  barData,
}) => {
  return (
    <XYPlot
      margin={{ bottom: 200 }}
      xType="ordinal"
      width={550}
      height={400}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-70} />
      <YAxis />
      <VerticalBarSeries
        data={barData}
      />
    </XYPlot>
  );
};

Bar.propTypes = {
  barData: propTypes.array.isRequired,
};

export default Bar;
