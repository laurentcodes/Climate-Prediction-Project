import React, { useState } from 'react';
import axios from 'axios';
import { Route, Redirect, history } from 'react-router-dom';
import { Form, FormLabel, Button } from 'react-bootstrap';

import FormContainer from '../FormContainer';
import Message from '../Message';

const Duration = ({ history }) => {
	const [start, setStart] = useState('');
	const [startYear, setStartYear] = useState('');
	const [end, setEnd] = useState('');
	const [endYear, setEndYear] = useState('');
	const [empty, setEmpty] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			start,
			startYear,
			end,
			endYear,
		};

		function checkProperties(data) {
			for (var key in data) {
				if (data[key] !== null && data[key] != '') return false;
			}
			return true;
		}

		const isEmpty = checkProperties(data);

		if (isEmpty) {
			setEmpty(true);

			setTimeout(() => {
				setEmpty(false);
			}, 3000);
		} else {
			setEmpty(false);
		}
		console.log(isEmpty);

		axios
			.post('climate-prediction-proj.herokuapp.com/api/res', {
				method: 'POST',
				headers: {
					content_type: 'application/json',
				},
				body: data,
			})
			.then((res) =>
				history.push({
					pathname: '/result',
					state: res.data,
				})
			)
			.catch((err) => console.log(err));
	};

	return (
		<FormContainer>
			<Button
				type='submit'
				variant='primary'
				className='my-3'
				onClick={() => history.push('/')}
			>
				Home
			</Button>

			<h2 className='py-4'>Duration Selection</h2>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>Start Month: </Form.Label>
					<Form.Control
						as='select'
						value={start}
						onChange={(e) => setStart(e.target.value)}
					>
						<option defaultValue>Start Month...</option>
						<option>January</option>
						<option>February</option>
						<option>March</option>
						<option>April</option>
						<option>May</option>
						<option>June</option>
						<option>July</option>
						<option>August</option>
						<option>September</option>
						<option>October</option>
						<option>November</option>
						<option>December</option>
					</Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>Start Year: </Form.Label>
					<Form.Control
						as='select'
						value={startYear}
						onChange={(e) => setStartYear(e.target.value)}
					>
						<option defaultValue>Start Year...</option>
						<option>2021</option>
						<option>2022</option>
						<option>2023</option>
						<option>2024</option>
						<option>2025</option>
						<option>2026</option>
						<option>2027</option>
						<option>2028</option>
						<option>2029</option>
						<option>2030</option>
					</Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>End Month: </Form.Label>
					<Form.Control
						as='select'
						value={end}
						onChange={(e) => setEnd(e.target.value)}
					>
						<option defaultValue>End Month...</option>
						<option>January</option>
						<option>February</option>
						<option>March</option>
						<option>April</option>
						<option>May</option>
						<option>June</option>
						<option>July</option>
						<option>August</option>
						<option>September</option>
						<option>October</option>
						<option>November</option>
						<option>December</option>
					</Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>End Year: </Form.Label>
					<Form.Control
						as='select'
						value={endYear}
						onChange={(e) => setEndYear(e.target.value)}
					>
						<option defaultValue>End Year...</option>
						<option>2021</option>
						<option>2022</option>
						<option>2023</option>
						<option>2024</option>
						<option>2025</option>
						<option>2026</option>
						<option>2027</option>
						<option>2028</option>
						<option>2029</option>
						<option>2030</option>
					</Form.Control>
				</Form.Group>

				<div className='py-3'>
					{empty && (
						<Message variant='danger'>
							One or more fields are empty or invalid
						</Message>
					)}
				</div>

				<Button type='submit' variant='primary' className='my-3'>
					Predict
				</Button>
			</Form>
		</FormContainer>
	);
};

export default Duration;
