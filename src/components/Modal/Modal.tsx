// import {
// 	ChangeEvent,
// 	FC,
// 	MouseEvent,
// 	MouseEventHandler,
// 	ReactNode,
// 	useState,
// } from 'react';

// type Props = {
// 	children: ReactNode;
// };

// export const Modal: FC<Props> = ({ children }) => {
// 	const [visible, setVisible] = useState(false);

// 	const handleOpen = () => {};

// 	const handleClose = (e: MouseEvent<HTMLDivElement>) => {
// 		e.stopPropagation();
// 		setVisible(false);
// 	};

// 	const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
// 		e.stopPropagation();
// 	};

// 	return (
// 		<>
// 			<div onClick={handleOpen}>{openComponent}</div>
// 			{visible && (
// 				<div onClick={handleClose} className='relative h-screen w-screen'>
// 					<div className='w-full h-full' onClick={stopPropagation}>
// 						{children}
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };
