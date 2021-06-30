import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import Message from '../Message';

const Prediction = ({ location, history }) => {
	const [temp, setTemp] = useState('');
	const [hum, setHum] = useState('');
	const [rain, setRain] = useState('');
	const [years, setYears] = useState('');
	const [months, setMonths] = useState('');
	const [days, setDays] = useState('');
	const [totalMonth, setTotalMonths] = useState('');
	const [start, setStart] = useState(0);
	const [i, setI] = useState(0);
	const [stop, setStop] = useState(null);
	const [load, setLoad] = useState(true);

	useEffect(() => {
		setTemp(location.state.temp);
		setHum(location.state.hum);
		setRain(location.state.rain);
		setYears(location.state.years);
		setMonths(location.state.months);
		setDays(location.state.days);
		setTotalMonths(location.state.totalmonth);
		setStop(location.state.days[i]);
	}, [setTemp, location.state, i]);

	// const setFigures = () => {
	// 	console.log('Here');
	// 	// if (this.stateload) {
	// 	setStart(stop);
	// 	setStop(location.state.days[i]);

	// 	// }
	// };

	const exportData = Object.entries(location.state);

	let t = 0;
	let st = 0;
	let sp = 0;
	let mPointer = 0;
	let ms = 0;
	let me = 0;

	let result = location.state.years.map((year, index) => {
		ms = 0 + me;
		me = me + location.state.totalmonth[mPointer];

		mPointer = mPointer + 1;

		return location.state.months.slice(ms, me).map((month, ind) => {
			st = 0 + sp;
			sp = sp + location.state.days[t];
			t = t + 1;

			return (
				<>
					<div key={ind} className='title'>
						<h1>
							{month} {year}
						</h1>
					</div>
					<Table hover size='md' dark responsive>
						<thead>
							<tr>
								<th>Day</th>
								<th>Temperature(°C)</th>
								<th>Humidity(%)</th>
								<th>Precipitation(mm)</th>
							</tr>
						</thead>
						<tbody>
							{location.state.temp.slice(st, sp).map((temp, index) => {
								return (
									<Fragment key={index}>
										<tr>
											<th scope='row' className='ind'>
												{index + 1}
											</th>
											<td>{temp}</td>
											<td>{location.state.hum[index + st]}</td>
											<td>{location.state.rain[index + st]}</td>
										</tr>
									</Fragment>
								);
							})}
						</tbody>
					</Table>
				</>
			);
		});
	});

	return (
		<div>
			<div>
				<Container>
					<div>
						<Button
							variant='info'
							className='mx-3'
							onClick={() => history.push('/duration')}
						>
							Back
						</Button>
						<Button variant='primary' onClick={() => history.push('/')}>
							Home
						</Button>

						<h2 className='py-3'>RESULT</h2>
						<div>
							<CSVLink
								data={exportData}
								filename='Climate Values Export'
								className='text-white btn btn-warning'
							>
								EXPORT
							</CSVLink>
						</div>
						<div className='my-3'>
							{location.state.days.length > 0 &&
							location.state.months.length > 0 ? (
								''
							) : (
								<Message variant='danger'>
									Invalid Month/Year Selections, Please Go Back and Retry
								</Message>
							)}
						</div>
					</div>
					<div>
						<div>{result}</div>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default withRouter(Prediction);
