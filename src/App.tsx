import { Keyboard } from './components/Keyboard/Keyboard';
import { Header } from './components/Layout/Header';
import { WordBoard } from './components/WordBoard/WordBoard';

function App() {
	return (
		<main className='w-full h-full'>
			<div className='px-[20%] mt-24 '>
				<WordBoard />
			</div>
		</main>
	);
}

export default App;
