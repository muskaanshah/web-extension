import { useEffect } from 'react';
import axios from 'axios';

const changeQuoteHandler = (setQuote, setUpdateQuote) => {
	localStorage.removeItem('Quote');
	setQuote({ text: '', author: '' });
	setUpdateQuote((prev) => !prev);
};
function Quote({ setQuote, quote, updateQuote }) {
	useEffect(() => {
		(async () => {
			try {
				const initialQuote = JSON.parse(localStorage?.getItem('Quote'));
				if (!initialQuote) {
					const res = await axios.get(
						'https://api.quotable.io/random'
					);
					setQuote({
						text: res.data.content,
						author: res.data.author,
					});
					localStorage.setItem(
						'Quote',
						JSON.stringify({
							text: res.data.content,
							author: res.data.author,
						})
					);
				} else setQuote(initialQuote);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [updateQuote, setQuote]);
	return (
		<div className='quote-bottom-center'>
			<p className='mb-0-5'>{`"${quote?.text}"`}</p>
			<p className='quote-author mt-0'>
				{quote.author === null ? `By unknown` : `By ${quote?.author}`}
			</p>
		</div>
	);
}

export { Quote, changeQuoteHandler };
