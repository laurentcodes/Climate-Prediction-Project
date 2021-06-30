import React, { useState, useEffect } from 'react';
import { Jumbotron, Spinner, Card, Button, Row, Col } from 'react-bootstrap';

import axios from 'axios';

const Home = ({ history }) => {
	const [tempNow, setTempNow] = useState('');
	const [humNow, setHumNow] = useState('');
	const [rainNow, setRainNow] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get('/api/current');
			setTempNow(data.hum);
			setHumNow(data.temp);
			setRainNow(data.rain);
			setLoading(false);
		};

		fetchData();
	});

	return (
		<Jumbotron>
			<Row className='justify-content-md-center'>
				<Card
					border='primary'
					style={{ width: '50rem' }}
					className='text-center my-3'
				>
					<Card.Body>
						<Card.Title>TODAY</Card.Title>
						{loading ? (
							<Spinner animation='border' variant='primary' />
						) : (
							<Card.Text>
								<h5>Humidity: {humNow}%</h5>

								<h5>Temperature: {tempNow}°C</h5>

								<h5>Precipitation: {rainNow}mm</h5>
							</Card.Text>
						)}
					</Card.Body>
				</Card>

				<Card
					style={{ width: '50rem' }}
					bg='success'
					className='text-center my-3'
				>
					<Card.Body>
						<h5>A Predictive Climate System For Agriculture</h5> This is a
						prediction system that helps in predicting future values of certain
						climate variables useful to agriculture in order to enable the user
						plan ahead of time to have good agricultural output and prevent
						unexpected result. The climatic variables includes: Temperature,
						Rainfall & Humidity.
					</Card.Body>
				</Card>

				<Card style={{ width: '50rem' }} className='text-center'>
					<Card.Body>
						<Card.Title>INSTRUCTIONS</Card.Title>
						<Card.Text>
							To make custom predictions from a particular month and year to
							another period in the future, click the custom prediction button.
							<br />
							<br />
							Input values for the month from the dropdown and the year for both
							period required for the prediction then click the predict button
							to start prediction.
							<br />
							<br />
							View the output of the prediction and export if you want to have
							to saved and you can plan all along and have a good agricultural
							year!
						</Card.Text>
						<Button variant='dark' onClick={() => history.push('/duration')}>
							Custom Predictions
						</Button>
					</Card.Body>
				</Card>
			</Row>
		</Jumbotron>
	);
};

export default Home;
