import classNames from 'classnames';
import { FC, HTMLAttributes, memo } from 'react';

type Props = {
	className?: HTMLAttributes<HTMLDivElement>['className'];
	wpss: number[];
	type?: 'default' | 'double';
	height?: number;
	count?: number;
	wpsVisible?: boolean;
};

export const WpsStats: FC<Props> = memo(
	({
		wpss,
		className,
		type = 'default',
		height = 100,
		count = 20,
		wpsVisible = false,
	}) => {
		const normilizeHeight = (wps: number, max: number, min: number = 0) => {
			console.log(((wps - min) / (max - min)) * 100);

			return (wps - min) / (max - min);
		};

		const wss = (() => {
			let res: number[] = wpss;

			if (type == 'double') {
				const array = [...res].slice(-count / 2);
				res = [...[...array].reverse(), ...[...array]];
			} else if ((type = 'default')) {
				res = res.splice(0, count);
			}

			return res;
		})();

		return (
			<div
				className={classNames(
					'overflow-auto rotate-180 flex w-full',
					className
				)}
				style={{
					height: height + 'px',
				}}
			>
				{wss.map((wps, i) => (
					<div
						key={i}
						className='bg-secondary flex justify-center items-center w-full'
						style={{
							height: `${normilizeHeight(wps, height, 0) * 100}%`,
						}}
					>
						{wpsVisible && (
							<span className='text-xs rotate-180'>{wps != 0 && wps}</span>
						)}
					</div>
				))}
			</div>
		);
	}
);
