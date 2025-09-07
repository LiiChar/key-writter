import classNames from 'classnames';
import { FC, HTMLAttributes, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
		// Берём последние count значений
		const values =
			type === 'double'
				? (() => {
						const slice = wpss.slice(-Math.floor(count / 2));
						return [...slice].reverse().concat(slice);
				  })()
				: wpss.slice(-count);

		// Максимум для нормализации
		const maxWps = Math.max(...values, 1);

		const barWidth = `${100 / Math.max(values.length, 1)}%`;

		return (
			<div
				className={classNames(
					'flex items-end gap-[2px] overflow-hidden bg-gray-100 p-1',
					className
				)}
				style={{ height }}
			>
				<AnimatePresence>
					{values.map((wps, i) => (
						<motion.div
							key={i}
							className='bg-primary flex justify-center items-end'
							style={{ width: barWidth }}
							initial={{ height: 0 }}
							animate={{ height: `${(wps / maxWps) * 100}%` }}
							exit={{ height: 0 }}
							transition={{ duration: 0.3 }}
						>
							{wpsVisible && (
								<span className='text-xs text-white'>{wps || ''}</span>
							)}
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		);
	}
);
