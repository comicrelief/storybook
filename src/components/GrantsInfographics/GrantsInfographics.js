import React, { Component } from 'react';
import RandomColor from 'randomcolor';
import axios from 'axios';
import Chart from './Chart';
import Bar from './Bar';
import './scss/index.scss';
import './scss/react-vis.scss';

class GrantsInfograpics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: [],
      location: [],
      awarded: '',
      projects: '',
      barData: [],
      chartData1: [],
      chartData2: [],
    };
  }

  componentDidMount() {
    axios.get(this.props.grantsAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error('something went wrong');
        }
        return response.json();
      })
      .then((response) => {
        const grantData = response.data.facets;
        const awardedTotal = this.sum(grantData.issue.map(a => a.total_awarded));
        const projectTotal = this.sum(grantData.issue.map(a => a.count));
        const barData = [];
        const chartData1 = [];
        const chartData2 = [];

        grantData.issue.map((data) => {
          barData.push({ x: data.key, y: data.count });
          return barData;
        });

        grantData.country_name.filter((r) => { return r.key === 'UNITED KINGDOM'; }).map((data) => {
          const projects = Math.trunc((data.count/projectTotal)*100);
          const awarded = Math.trunc((data.total_awarded/awardedTotal)*100);

          chartData1.push(
            { theta: projects/10, color: RandomColor({ hue: 'blue', luminosity: 'light' }), label: 'United Kingdom', subLabel: `${projects}%` },
            { theta: 10 - (projects/10), color: RandomColor({ hue: 'purple', luminosity: 'light' }), label: 'International', subLabel: `${(100 - projects)}%` },
          );

          chartData2.push(
            { theta: awarded/10, color: RandomColor({ hue: 'red', luminosity: 'light' }), label: 'United Kingdom', subLabel: `${awarded}%` },
            { theta: 10 - (awarded/10), color: RandomColor({ hue: 'orange', luminosity: 'light' }), label: 'International', subLabel: `${(100 - awarded)}%` },
          );

          return { chartData1, chartData2 };
        });

        this.setState({
          issue: grantData.issue,
          location: grantData.country_name,
          awarded: awardedTotal,
          projects: projectTotal,
          barData: barData,
          chartData1: chartData1,
          chartData2: chartData2,
        });
      },
      );
  }

  sum(data) {
    const processed = data.reduce((a, b) => a + b, 0);
    return processed;
  }

  render() {
    const { issue, location, barData, awarded, projects, chartData1, chartData2 } = this.state;

    return (
      <main>
        <div className="grid intro">
          <h1>Grants Open Data</h1>
        </div>
        <div className="grid facts-1">
          <h2>
            Awarded<br /><span>{Math.trunc(awarded/1000000)}</span>+ millions
          </h2>
        </div>
        <div className="grid facts-2">
          <h2>
            <span>{projects}</span><br />active projects
          </h2>
        </div>
        <div className="grid facts-3">
          <h2>
            <span> {issue.length}</span> categories
          </h2>
        </div>
        <div className="grid facts-4">
          <h2>
            Over <span>{location.length}</span> countries in the world!
          </h2>
        </div>
        <div className="grid bar">
          <Bar barData={barData} />
        </div>
        <div className="grid chart-1">
          <Chart chartData={chartData1} innerRadius="80" />
          <p>Percentage of active projects</p>
        </div>
        <div className="grid chart-2">
          <Chart chartData={chartData2} innerRadius="80" />
          <p>Percentage of amount awarded</p>
        </div>
        <div className="grid footer" />
      </main>
    );
  }
}

export default GrantsInfograpics;
