import { FC, MouseEvent, ReactNode, useState } from 'react';
import { useConfig } from '../../context/useConfig';

type Props = {
	children: ReactNode;
};

export const ConfigModal: FC<Props> = ({ children }) => {
	const [visible, setVisible] = useState(false);
	const { config, setConfigPropery } = useConfig();

	const handleOpen = () => {
		setVisible(prev => !prev);
	};

	const handleClose = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setVisible(false);
	};

	const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<aside className='w-min h-min'>
			<button onClick={handleOpen}>{children}</button>
			{visible && (
				<section
					onClick={handleClose}
					className='static top-0 left-0 h-screen w-screen'
				>
					<div className='relative w-full h-full' onClick={stopPropagation}>
						<div className='absolute h-full w-1/3 left-0 top-0 p-4'>
							<button
								onClick={() => setConfigPropery('errorStop', !config.errorStop)}
							>
								Сменить тип ввода
							</button>
							<button
								onClick={() =>
									setConfigPropery('keyboardVisible', !config.keyboardVisible)
								}
							>
								Видимость клавиатуры
							</button>
							<input
								type='range'
								onChange={e =>
									setConfigPropery('wpsStatsCount', +e.target.value)
								}
							/>
							<select
								onChange={e => {
									if (e.target.value == 'default' || e.target.value == 'double')
										setConfigPropery('wpsStatsType', e.target.value);
								}}
							>
								<option value='default'>Default</option>
								<option value='double'>Double</option>
							</select>
						</div>
					</div>
				</section>
			)}
		</aside>
	);
};
