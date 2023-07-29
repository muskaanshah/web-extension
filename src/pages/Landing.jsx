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

const mantrasArr = [
	{ id: 1, text: 'Create everyday' },
	{ id: 2, text: 'Help others' },
	{ id: 3, text: 'Trust yourself' },
	{ id: 4, text: 'Choose love' },
	{ id: 5, text: 'Give back' },
	{ id: 6, text: 'Be gentle with yourself' },
	{ id: 7, text: 'Be a victor, not a victim' },
	{ id: 8, text: 'Never give up!' },
	{ id: 9, text: 'Be the change' },
	{ id: 10, text: 'Action conquers fear' },
	{ id: 11, text: 'Follow your excitement' },
	{ id: 12, text: 'Be happy, peaceful and whole' },
	{ id: 13, text: 'Teach everything you know' },
	{ id: 14, text: 'I am capable of achieving my goals' },
	{ id: 15, text: 'Embrace change and grow stronger' },
	{ id: 16, text: 'Every day is a fresh start' },
	{ id: 17, text: 'I am worthy of love and success' },
	{ id: 18, text: 'Let go of what no longer serves me' },
	{ id: 19, text: 'Grateful for all that I have' },
	{ id: 20, text: 'I am confident and believe in myself' },
	{ id: 21, text: 'Radiate positivity and kindness' },
	{ id: 22, text: 'I am focused and productive' },
	{ id: 23, text: 'I am enough' },
	{ id: 24, text: 'This too shall pass' },
	{ id: 25, text: 'I can do this' },
	{ id: 26, text: 'Breathe and let go' },
	{ id: 27, text: 'Stay present, stay calm' },
	{ id: 28, text: 'Embrace the journey' },
	{ id: 29, text: 'I am strong' },
	{ id: 30, text: 'Choose joy' },
	{ id: 31, text: 'I am worthy' },
	{ id: 32, text: 'I believe in myself' },
	{ id: 33, text: 'One step at a time' },
	{ id: 34, text: 'I am resilient' },
	{ id: 35, text: 'Let it be' },
	{ id: 36, text: 'Positivity in, negativity out' },
	{ id: 37, text: 'At peace' },
	{ id: 38, text: 'Breathe, believe, achieve' },
	{ id: 39, text: 'Stay present, stay calm' },
	{ id: 40, text: 'Peace begins with me' },
	{ id: 41, text: 'Gratitude changes everything' },
	{ id: 42, text: 'Focus fuels success' },
	{ id: 43, text: 'I am limitless potential' },
	{ id: 44, text: 'Change is opportunity' },
	{ id: 45, text: 'I am in control of my thoughts' },
	{ id: 46, text: 'Every day is a new beginning' },
	{ id: 47, text: 'Confidence creates possibilities' },
	{ id: 48, text: 'Attract abundance effortlessly' },
	{ id: 49, text: 'Let go and trust' },
];

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
		<div className='landingimage overlay-wrapper'>
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
			</div>
		</div>
	);
}

export { Landing };
