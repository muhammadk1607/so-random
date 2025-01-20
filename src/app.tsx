import { useState, useEffect } from 'preact/hooks'
import { LoremIpsum } from 'lorem-ipsum';

import { Alert } from "./components/alert/alert.tsx";

const lorem = new LoremIpsum(
	{
		sentencesPerParagraph: {
			max: 8,
			min: 4,
		},
		wordsPerSentence: {
			max: 16,
			min: 4,
		},
	}
);

const types = ['paragraph', 'sentence', 'word'];

export const App = () => {
  const [text, setText] = useState("")
	const [alertText, setAlertText] = useState('');
	const [type, setType] = useState(0);
	const [number, setNumber] = useState(4);
	const [isAlert, setIsAlert] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(text);
		setTimeout(() => setIsAlert(false), 1000);
		setAlertText('Copied to Clipboard');
		setIsAlert(true);
	};


	const generate = (num = number) => {
		if (type === 0) {
			setText(lorem.generateParagraphs(num));
		}
		else if (type === 1) {
			setText(lorem.generateSentences(num));
		}
		else if (type === 2) {
			setText(lorem.generateWords(num));
		}
	};

	const changeType = (type: number) => {
		setType(type);
	};

  const changeNumber = (num: number) => {
    setNumber(num);
    generate(num)
  };

  return (
		<>
			<header id='top-bar'>
				<div>
					<input
						type='number'
						name='number'
						id='number'
						min='1'
						value={number}
						onChange={e => changeNumber(parseInt(e.target.value))}
					/>
					<select
						name='generate-options'
						id='generate-options'
						value={type}
						onChange={e => changeType(parseInt(e.target.value))}
					>
						{
							types.map((type, index) => {
								return (
									<option key={index} value={index}>{type}</option>
								);
							})
						}
					</select>
					<button id='generate-btn' className='btn' onClick={generate}>Generate!</button>
				</div>
				<button id='copy-btn' className='btn' onClick={copyToClipboard}>Copy</button>
			</header>

			<main className='text-container'>
				{
					text.split('\n').map((line, index) => {
						return <p key={index} className='paragraph'>{line}</p>;
					})
				}
			</main>
			{ isAlert && <Alert text={alertText} /> }

		</>
	);
}
