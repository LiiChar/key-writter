import { useEffect, useRef, useState } from 'react';
import { Char, useCharArray } from '../../lib/string';
import classNames from 'classnames';
import { WpsStats } from './WpsStats';
import { useConfig } from '../../context/useConfig';
import { Keyboard } from '../Keyboard/Keyboard';
import { getIsPressedCapsLock, getLanguage } from '../../lib/keyboard';

export const WordBoard = () => {
	const [cursorPosition, setCursorPosition] = useState(0);
	const [wpss, setWpss] = useState<number[]>([]);
	const [_, setCount] = useState(0);
	const [wps, setWps] = useState(0);
	const [info, setInfo] = useState<string[]>([]);

	// const [cursor, setCursor] = useState<{ position: number }>({});
	const [input, setInput] = useState('');
	const { text, setText, getRandomText, setStatus } = useCharArray();
	const { config } = useConfig();

	const clearChar = () => {
		if (config.errorStop) {
			return;
		}

		setCursorPosition(prev => {
			if (prev > 0) {
				setStatus(prev, 'default');
				setStatus(prev - 1, 'current');
				return --prev;
			} else {
				return prev;
			}
		});
	};

	useEffect(() => {
		document.body.addEventListener('click', () => {
			handleFocus();
		});

		document.body.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key == 'Backspace') {
				clearChar();
			}
			setInfo(prev => {
				prev[0] = getLanguage(e.key);
				return prev;
			});
			if (getIsPressedCapsLock(e)) {
				setInfo(prev => {
					prev[1] = 'Caplock';
					return prev;
				});
			} else {
				setInfo(prev => {
					prev[1] = '';
					return prev;
				});
			}
		});

		const timer = setInterval(() => {
			setCount(prev => {
				setWps(prev * 10);
				setWpss(preva => [...preva, prev * 10]);
				return 0;
			});
		}, 1000);

		return () => {
			document.body.removeEventListener('click', () => {
				handleFocus();
			});
			document.body.removeEventListener('keydown', () => {
				clearChar();
			});

			clearInterval(timer);
		};
	}, []);

	const refInput = useRef<HTMLInputElement>(null);

	const handleInput = (value: string) => {
		if (config.errorStop) {
			if (value == text[cursorPosition].char) {
				setStatus(cursorPosition, 'succesefully');
				setCursorPosition(prev => prev + 1);
				setStatus(cursorPosition + 1, 'current');

				setCount(prev => prev + 1);

				if (cursorPosition == text.length - 1) {
					setText(getRandomText());

					setCursorPosition(0);
				}
			} else {
				setStatus(cursorPosition, 'error');
			}
		} else {
			if (value == text[cursorPosition].char) {
				setStatus(cursorPosition, 'succesefully');
			} else {
				setStatus(cursorPosition, 'error');
			}
			setCursorPosition(prev => prev + 1);
			setStatus(cursorPosition + 1, 'current');

			setCount(prev => prev + 1);

			if (cursorPosition == text.length - 1) {
				setText(getRandomText());
				setCursorPosition(0);
			}
		}

		setInput('');
	};

	const handleFocus = () => {
		if (!refInput || refInput.current == null) {
			return;
		}
		refInput.current.focus();
	};

	const colorSet = (char: Char) => {
		if (char.status == 'error') {
			return 'bg-accent';
		}

		if (char.status == 'current') {
			return 'bg-primary';
		}

		if (char.status == 'succesefully') {
			return 'bg-background';
		}
		return 'transparent';
	};

	return (
		<div className='relative bg-secondary p-1' onClick={handleFocus}>
			<div className='relative mb-2 flex p-2 flex-wrap h-full z-[1] max-h-[150px] overflow-auto'>
				{text.map((char, i) => (
					<div
						key={i}
						className={classNames(
							`	pb-[1px]`,
							colorSet(char),
							char.char == ' ' && 'h-[25px] w-[8px]',
							char.status == 'hide' && 'hidden'
						)}
					>
						{char.char}
					</div>
				))}
				<input
					className='opacity-0 outline-none bg-transparent absolute w-full top-0 left-0 z-[-1] max-w-full h-full'
					value={input}
					onChange={e => handleInput(e.target.value)}
					autoFocus
					ref={refInput}
				/>
			</div>

			<div className='bg-secondary  w-min  absolute top-0 translate-x-full right-0 p-1'>
				<div className='min-w-[29px] flex justify-center items-center'>
					{wps}
				</div>
				<ul className='min-w-[29px] flex-col flex justify-center items-center'>
					{info.map(inf => (
						<li>{inf}</li>
					))}
				</ul>
			</div>
			{/* <div className=' h-min  w-min flex justify-center items-center absolute top-0 -translate-x-full left-0 pr-1'>
				<ConfigModal>
					<Settings />
				</ConfigModal>
			</div> */}
			<WpsStats
				className='absolute -translate-y-full top-0 left-0'
				wpss={wpss}
				type={config.wpsStatsType}
				count={config.wpsStatsCount}
			/>
			{config.keyboardVisible && <Keyboard />}
		</div>
	);
};
