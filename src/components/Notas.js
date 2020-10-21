import React, { Component } from 'react';

export default class Notas extends Component {
  handleInputChange = (event) => {
    const { id } = this.props.currentGrades;
    const grade =
      Number.parseInt(
        event.target.value,
        10
      ) /* prevent NaN - Received NaN for the `defaultValue` attribute. 
            If this is expected, cast the value to a string */ ||
      0;
    this.props.onGradeChange(grade, id);
  };

  render() {
    const { labelName, currentGrades } = this.props;
    const { grades } = currentGrades;
    return (
      <div className="row">
        <div className="col s10">
          <label>{labelName}</label>
          <input
            style={grades >= 60 ? styles.toColorGreen : styles.toColorRed}
            defaultValue={grades}
            type="number"
            onInput={this.handleInputChange}
            min="0"
            max="100"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  toColorRed: {
    color: 'red',
    fontWeight: 'bold',
  },
  toColorGreen: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
};
