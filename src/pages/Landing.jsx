import './landingpage.css';
import './loader.css';
import { Focus } from '../components/Focus/Focus';
import { Weather } from '../components/Weather/Weather';
import { GoogleSearch } from '../components/GoogleSearch/GoogleSearch';
import { Quote } from '../components/Quote/Quote';
import { Countdown } from '../components/countdown/Countdown';
import { TimeDisplay } from '../components/TimeDisplay/TimeDisplay';
import { TodoWrapper } from '../components/Todo/TodoWrapper';
import { Settings } from '../components/Settings/Settings';
import { useEffect, useState } from 'react';
import { Notes } from '../components/Notes/Notes';
import { mantrasArr } from '../data/mantras';
import { getImage } from '../utils/get-image';

export const calculateMantra = () => {
	const skippedMantras = JSON.parse(localStorage.getItem('mantras')).skipped;
	const tempMantras = mantrasArr.filter(
		(mantra) => !skippedMantras.includes(mantra.id)
	);
	const randomNumber = Math.floor(Math.random() * tempMantras.length - 1);
	return tempMantras[randomNumber];
};

function Landing() {
	const [quote, setQuote] = useState({ text: '', author: '' });
	const [updateQuote, setUpdateQuote] = useState(false);
	const [showMantras, setShowMantras] = useState(
		localStorage.getItem('mantras')
			? JSON.parse(localStorage.getItem('mantras'))
			: {
					enabled: false,
					mantra: '',
					skipped: [],
			  }
	);

	useEffect(() => {
		localStorage.setItem('mantras', JSON.stringify(showMantras));
	}, [showMantras]);
	return (
		<div
			className='landingimage overlay-wrapper'
			style={{ backgroundImage: `url('${getImage().url}')` }}
		>
			<div className='overlay'>
				<TimeDisplay
					showMantras={showMantras}
					setShowMantras={setShowMantras}
				/>
				<Focus />
				<Settings
					setQuote={setQuote}
					setUpdateQuote={setUpdateQuote}
					showMantras={showMantras}
					setShowMantras={setShowMantras}
				/>
				<Weather />
				<Countdown />
				<Quote
					setQuote={setQuote}
					quote={quote}
					updateQuote={updateQuote}
				/>
				<TodoWrapper />
				<GoogleSearch />
				<Notes />
				{/* <SpotifyLogin /> */}
			</div>
		</div>
	);
}

export { Landing };
