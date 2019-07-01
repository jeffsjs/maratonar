import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingSeries } from '../actions/actions';
import Loading from './loading';

import { format, differenceInDays, addDays } from 'date-fns';
import DatePicker from 'react-date-picker';
import Select from './select';

const HOURS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ];
class FormCalcular extends Component {
	state = {
		date: new Date(),
		hours: 0,
		disableDate: false,
		disableHours: false,
		calc: false
	};

	onChange = date => {
		this.setState({ date, calc: true, disableHours: true });
	};

	setValue = hours => {
		this.setState({ hours, calc: true, disableDate: true });
	};

	clean = () => {
		this.setState({	date: new Date(), hours: 0, disableDate: false, disableHours: false, calc: false})
	}

	calcularMaratona = () => {
		const { stateRedux } = this.props;
		const { marathonDuration, dateNextEpisode } = stateRedux;
		const { calc, hours, date, disableDate, disableHours } = this.state;

		if (calc) {
			const qtdHours = Math.ceil(marathonDuration/60);
			let hoursPerDay = 0;
			let distance = 0;
			let ret = { message: '' };

			if (disableDate) {
				hoursPerDay = Math.ceil(qtdHours/hours);
				const dayStart = format(addDays(dateNextEpisode, -hoursPerDay), 'DD-MM-YYYY');
				if (hoursPerDay < 24) {
					ret.message = `Pode começar no dia ${dayStart} Assistindo: ${hours}h(s) por dia! :)`; 
				} else {
					ret.message = 'IMPOSSIVEL ATÉ A DATA DO PROXIMO LANÇAMENTO';
				}
			}
			
			if (disableHours) {
				distance = differenceInDays(dateNextEpisode, date);
				hoursPerDay = qtdHours/distance;
				if (distance < 0 || hoursPerDay > 24) ret.message = 'IMPOSSIVEL ATÉ A DATA DO PROXIMO LANÇAMENTO';
				if (hoursPerDay > 1 && hoursPerDay <= 24) ret.message = `Você terá que assistir ${hoursPerDay}h(s) por dia.`;
				if (hoursPerDay < 1) ret.message = `Você pode assistir 1 episodio por dia. Você tem ${distance} dias até a extreia do próximo episódio.`;
			}
			
			return ret.message;
		}
	}

	render() {
		const { stateRedux } = this.props;
		const { loading, error, errorMessage, dateNextEpisode } = stateRedux;

		if (error) return <div className='error'>{errorMessage}</div>;
		if (loading) return <Loading />;

		const { date, calc, hours, disableDate, disableHours } = this.state;

		return (
			<div className='form-calcular'>
				<div className='row column'>
					<div className='item'>
						<h3>CALCULAR</h3>
					</div>

					<div className='item'>
						<DatePicker minDate={new Date()} maxDate={new Date(dateNextEpisode)}  onChange={this.onChange} value={date} disabled={disableDate} />
					</div>
					<div className='item'>
						<Select options={HOURS} setValue={this.setValue} disabled={disableHours} value={hours} />
					</div>
					<div className='item'>
						<button className='btn outline lg block' onClick={() => this.clean() }>LIMPAR</button>
					</div>

					{calc && <div className='item'>{this.calcularMaratona()}</div>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { stateRedux: state.mainReducer };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ loadingSeries }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormCalcular);
