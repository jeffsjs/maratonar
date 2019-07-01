import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.setValue(e.target.value);
  }
  render(props) {
    const options = this.props.options.map(elem => (
      <option value={elem} key={elem}>{elem === 0 ? 'Selecione' : elem}</option>
    ));

    return (
      <select className='select-default' value={this.props.value} onChange={this.handleChange} disabled={this.props.disabled}>
        {options}
      </select>
    );
  }
}

export default Select;