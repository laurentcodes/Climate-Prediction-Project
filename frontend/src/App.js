import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home/Home';
import Duration from './components/Duration/Duration';
import Prediction from './components/Prediction/Prediction';
import About from './components/About/About';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/result' component={Prediction} />
					<Route path='/duration' component={Duration} />
					<Route path='/about' component={About} />
					<Route path='/' exact component={Home} />
					{/* <Redirect to='/' /> */}
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
