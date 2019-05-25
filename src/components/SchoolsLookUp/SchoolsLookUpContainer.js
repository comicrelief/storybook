import React, { Component } from 'react';
import SchoolsLookUp from './SchoolsLookUp';

class SchoolsLookUpContainer extends Component {
  /**
   * SchoolsLookUpContainer constructor.
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * Handle change event.
   * @param data
   */
  onChange(identifier, event) {
    this.setState({ [identifier]: event.target.value });
  }

  /**
   * Render Component.
   * @return {XML}
   */
  render() {
    return (
      <SchoolsLookUp
        {...this.props}
        onChange={(identifier, event) => this.onChange(identifier, event)}
        establishmentIdIdentifier="establishmentIdValue"
        establishmentNameIdentifier="establishmentNameValue"
        address1Identifier="address1Value"
        address2Identifier="address2Value"
        address3Identifier="address3Value"
        townIdentifier="townValue"
        postcodeIdentifier="postcodeValue"
      />
    );
  }
}

export default SchoolsLookUpContainer;
