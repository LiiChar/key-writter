import { useEffect, useRef, useState, useCallback } from 'react';
import { Char, useCharArray } from '../../lib/string';
import classNames from 'classnames';
import { WpsStats } from './WpsStats';
import { useConfig } from '../../context/useConfig';
import { Keyboard } from '../Keyboard/Keyboard';
import { getIsPressedCapsLock, getLanguage } from '../../lib/keyboard';

export const WordBoard = () => {
	const [cursorPosition, setCursorPosition] = useState(0);
	const [wpss, setWpss] = useState<number[]>([]);
	const [count, setCount] = useState(0);
	const [wps, setWps] = useState(0);
	const [info, setInfo] = useState<string[]>([]);

	const [input, setInput] = useState('');
	const { text, setText, getRandomText, setStatus } = useCharArray();
	const { config } = useConfig();
	const refInput = useRef<HTMLInputElement>(null);

	const clearChar = useCallback(() => {
		if (config.errorStop) return;

		setCursorPosition((prev) => {
			if (prev > 0) {
				setStatus(prev, 'default');
				setStatus(prev - 1, 'current');
				return prev - 1;
			}
			return prev;
		});
	}, [config.errorStop, setStatus]);

	const handleFocus = useCallback(() => {
		refInput.current?.focus();
	}, []);

	const handleInput = (value: string) => {
		const currentChar = text[cursorPosition];
		if (!currentChar) return;

		const isCorrect = value === currentChar.char;

		if (isCorrect) setStatus(cursorPosition, 'succesefully');
		else setStatus(cursorPosition, 'error');

		if (config.errorStop && !isCorrect) return setInput('');

		const nextPos = cursorPosition + 1;
		setCursorPosition(nextPos);
		setStatus(nextPos, 'current');
		setCount((prev) => prev + 1);

		if (nextPos >= text.length) {
			setText(getRandomText());
			setCursorPosition(0);
		}

		setInput('');
	};

	// Event listeners
	useEffect(() => {
		const handleClick = () => handleFocus();
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Backspace') clearChar();

			let lang = getLanguage(e.key);
			if (lang === 'un') {
				lang = info[0];
			}
			const caps = getIsPressedCapsLock(e) ? 'CapsLock' : '';
			setInfo([lang, caps]);
		};

		document.body.addEventListener('click', handleClick);
		document.body.addEventListener('keydown', handleKeydown);

		return () => {
			document.body.removeEventListener('click', handleClick);
			document.body.removeEventListener('keydown', handleKeydown);
		};
	}, [clearChar, handleFocus]);

	// WPS через requestAnimationFrame
	const wpsFrame = useRef(0);
	useEffect(() => {
		let animationId: number;

		const updateWps = () => {
			if (wpsFrame.current > 1000) {
				setWps(count * 10);
				setWpss((prev) => [...prev, count * 10]);
				setCount(0);
				wpsFrame.current = 0;
			} else {
				wpsFrame.current += 1;
			}
			animationId = requestAnimationFrame(updateWps);
		};

		animationId = requestAnimationFrame(updateWps);
		return () => cancelAnimationFrame(animationId);
	}, [count]);

	const colorMap: Record<Char['status'], string> = {
		error: 'bg-accent',
		current: 'bg-primary',
		succesefully: 'bg-background',
		default: 'transparent',
		hide: 'hidden',
	};

	return (
		<div className='relative bg-secondary p-1' onClick={handleFocus}>
			<div className='relative mb-2 flex p-2 flex-wrap h-full z-[1] max-h-[150px] overflow-auto'>
				{text.map((char, i) => (
					<div
						key={i}
						className={classNames(
							'pb-[1px]',
							colorMap[char.status],
							char.char === ' ' && 'h-[25px] w-[8px]'
						)}
					>
						{char.char}
					</div>
				))}
				<input
					className='opacity-0 outline-none bg-transparent absolute w-full top-0 left-0 z-[-1] max-w-full h-full'
					value={input}
					onChange={(e) => handleInput(e.target.value)}
					autoFocus
					ref={refInput}
				/>
			</div>

			<div className='bg-secondary w-min absolute top-0 translate-x-full right-0 p-1'>
				<div className='min-w-[29px] flex justify-center items-center'>
					{wps}
				</div>
				<ul className='min-w-[29px] flex-col flex justify-center items-center'>
					{info.map((inf, idx) => (
						<li key={idx}>{inf}</li>
					))}
				</ul>
			</div>

			{/* <WpsStats
				className='absolute -translate-y-full top-0 left-0'
				wpss={wpss}
				type={config.wpsStatsType}
				count={config.wpsStatsCount}
			/> */}

			{config.keyboardVisible && <Keyboard />}
		</div>
	);
};
