import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = ({ history }) => {
	return (
		<Container
			style={{ width: '25rem', height: '70vh' }}
			className='text-center'
		>
			<Row className='justify-content-md-center align-items-center h-100'>
				<Col>
					<p style={{ fontSize: '1.5rem' }}>
						This is a Climate Prediction App Made as part of fulfillment for my
						final year project.
					</p>

					<p style={{ fontSize: '1.3rem' }}>
						To find out more about me and my work, visit my GitHub or Twitter
					</p>
					<div>
						<Button
							variant='dark'
							className='mx-3'
							href='https://github.com/laurentcodes'
							target='_blank'
						>
							GitHub
						</Button>
						<Button
							variant='primary'
							href='https://twitter.com/laurentcodes'
							target='_blank'
						>
							Twitter
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default About;
