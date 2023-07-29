import { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { changeQuoteHandler } from '../Quote/Quote';
import { calculateMantra } from '../../pages/Landing';

export function Settings({
	setQuote,
	setUpdateQuote,
	showMantras,
	setShowMantras,
}) {
	const [settingsModal, setSettingsModal] = useState(false);
	const [isRetainTodos, setIsRetainTodos] = useState(false);
	const changeNameHandler = () => {
		localStorage.setItem('name', '');
		window.location.reload(false);
	};
	const modalRef = useRef();
	const toggleRef = useRef();
	useOnClickOutside(modalRef, toggleRef, () => setSettingsModal(false));
	useEffect(() => {
		if (localStorage.getItem('retain_todos') == null) {
			localStorage.setItem('retain_todos', false);
		}
		setIsRetainTodos(JSON.parse(localStorage.getItem('retain_todos')));
	}, []);
	const changeRetainTodosHander = (e) => {
		localStorage.setItem('retain_todos', !isRetainTodos);
		setIsRetainTodos((isRetainTodos) => !isRetainTodos);
	};
	const changeShowMantrasHander = () => {
		const mantraToShow = calculateMantra();
		setShowMantras({
			...showMantras,
			enabled: !showMantras.enabled,
			mantra: !showMantras.enabled ? mantraToShow : '',
		});
	};
	return (
		<div className='settings-hover'>
			{settingsModal && (
				<div
					className='ml-1 modal-settings borderradius-0-5 p-1'
					ref={modalRef}
				>
					<span
						className='btn btn-change-name ml-0 px-0 pt-0'
						onClick={changeNameHandler}
					>
						Change name
					</span>
					<div className='divider-black bg-grey-10 width-100' />
					<span
						className='btn btn-change-name ml-0 px-0'
						onClick={() => {
							changeQuoteHandler(setQuote, setUpdateQuote);
						}}
					>
						Change quote
					</span>
					<div className='divider-black bg-grey-10 width-100' />
					<div className='retain-todos-label py-1'>
						<p className='fs-0-8 my-0'>
							Retain todos after 24 hours
						</p>
						<input
							type='checkbox'
							className='todo-checkbox'
							checked={isRetainTodos}
							onClick={changeRetainTodosHander}
						/>
					</div>
					<div className='divider-black bg-grey-10 width-100' />
					<div className='retain-todos-label pt-1'>
						<p className='fs-0-8 my-0'>Show Mantras</p>
						<input
							type='checkbox'
							className='todo-checkbox'
							checked={showMantras.enabled}
							onClick={changeShowMantrasHander}
						/>
					</div>
				</div>
			)}
			<span
				ref={toggleRef}
				className='material-icons-outlined'
				onClick={() => setSettingsModal((prev) => !prev)}
			>
				settings
			</span>
		</div>
	);
}
