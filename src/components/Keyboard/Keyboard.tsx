import classNames from 'classnames';
import { ReactNode, memo, useEffect, useState } from 'react';

type Key = { key: string[]; width?: number | string; name?: ReactNode };

const keys: Key[][] = [
	[
		{ key: ['`', `ё`, '~'], width: 'px-[10px]' },
		{ key: ['1', '!'] },
		{ key: ['2', '@', '"'] },
		{ key: ['3'] },
		{ key: ['4'] },
		{ key: ['5'] },
		{ key: ['6'] },
		{ key: ['7'] },
		{ key: ['8'] },
		{ key: ['9'] },
		{ key: ['0'] },
		{ key: ['-'] },
		{ key: ['-'] },
		{ key: ['='] },
		{ key: ['Backspace'], width: 'px-[16px]' },
	],
	[
		{ key: ['Tab'], width: 'px-[14px]' },
		{ key: ['q'] },
		{ key: ['w'] },
		{ key: ['e'] },
		{ key: ['r'] },
		{ key: ['t'] },
		{ key: ['y'] },
		{ key: ['u'] },
		{ key: ['i'] },
		{ key: ['o'] },
		{ key: ['p'] },
		{ key: ['['] },
		{ key: [']'] },
		{ key: ['\\'] },
	],
	[
		{ key: ['CapsLock'], width: 'px-[2px]' },
		{ key: ['a'] },
		{ key: ['s'] },
		{ key: ['d'] },
		{ key: ['f'] },
		{ key: ['g'] },
		{ key: ['h'] },
		{ key: ['j'] },
		{ key: ['k'] },
		{ key: ['l'] },
		{ key: [';'] },
		{ key: ["'"] },
		{ key: ['Enter'], width: 'px-[15px]' },
	],
	[
		{ key: ['Shift'], width: 'px-[26px]' },
		{ key: ['z'] },
		{ key: ['x'] },
		{ key: ['c'] },
		{ key: ['v'] },
		{ key: ['b'] },
		{ key: ['n'] },
		{ key: ['m'] },
		{ key: [','] },
		{ key: ['.'] },
		{ key: ['/'] },
		{ key: ["'"] },
	],
	[
		{ key: ['Control'], name: 'Ctrl', width: 'px-[7px]' },
		{ key: ['Alt'], width: 'px-[10px]' },
		{ key: [' '], name: 'space' },
	],
];

export const Keyboard = memo(() => {
	const [key, setKey] = useState<string[]>([]);

	useEffect(() => {
		document.addEventListener('keydown', e => {
			setKey(prev => [...prev, e.key.toLowerCase()]);
		});

		document.addEventListener('keyup', e => {
			setKey(prev => prev.filter(el => el != e.key.toLowerCase()));
		});

		return () => {
			document.removeEventListener('keydown', e => {
				setKey(prev => [...prev, e.key.toLowerCase()]);
			});
			document.removeEventListener('keyup', e => {
				setKey(prev =>
					prev.filter(el => el.toLowerCase() != e.key.toLowerCase())
				);
			});
		};
	}, []);

	return (
		<div className='flex flex-col gap-1 w-full h-full'>
			{keys.map((keyRow, i) => (
				<div className='flex gap-1 justify-between' key={i}>
					{keyRow.map((k, i) => (
						<div
							className={classNames(
								'h-key-size relative border-y-font  flex bg-accent justify-center items-center ',
								key.includes(k.key[0].toLowerCase()) ||
									(k.key[1] && key.includes(k.key[1].toLowerCase())) ||
									(k.key[2] && key.includes(k.key[2].toLowerCase()))
									? 'bg-primary border-b-[1px] scale-y-90 translate-y-[1px]'
									: 'border-b-[3px]',
								k.width ? k.width : 'w-full'
							)}
							key={i}
						>
							{k.name ? k.name : k.key[0]}
							{k.key[1] && (
								<div className='absolute left-0 top-0 text-xs'>{k.key[1]}</div>
							)}
							{k.key[2] && (
								<div className='absolute right-0 bottom-0 text-xs'>
									{k.key[2]}
								</div>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
});
