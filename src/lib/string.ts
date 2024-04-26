import { useState } from 'react';

export type CharStatus =
	| 'error'
	| 'succesefully'
	| 'current'
	| 'hide'
	| 'default';

export type Char = {
	status: CharStatus;
	char: string;
};

export const parseStrintToArray = (str: string): Char[] => {
	const avbcb = str
		.replace(/\n/g, '')
		.replace(/\t/g, '')
		.replace('\n', '')
		.replace('	', '')
		.trim();
	return avbcb.split('').map((char: string) => ({ status: 'default', char }));
};

export const isLetterChar = (char: string) => {
	const letterOrPunctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()\[\]\?]/g;
	return letterOrPunctuationRegex.test(char);
};

export const isNumberChar = (char: string) => {
	const letterOrPunctuationRegex = /\d/g;
	return letterOrPunctuationRegex.test(char);
};

export const useCharArray = (str?: string) => {
	const getRandomText = (filter?: TypeText[]) => {
		const filteredText = texts.filter(text => {
			if (filter) {
				let res = false;
				filter.forEach(filter => {
					res = text.tag.includes(filter);
				});
				return res;
			} else {
				return true;
			}
		});
		return filteredText[Math.floor(Math.random() * filteredText.length)].text;
	};
	const [text, setTextArray] = useState(() => {
		const text = parseStrintToArray(str ? str : getRandomText());
		text[0] = { status: 'current', char: text[0].char };
		return text;
	});
	const [isPuctuation, setPuctuationArray] = useState(true);
	const [isNumber, setNumberArray] = useState(true);

	const setStatus = (index: number, status: CharStatus) => {
		setTextArray(prev => {
			if (text[index]) text[index].status = status;
			return prev;
		});
	};

	const setText = (str: string) => {
		const parsed = parseStrintToArray(str);
		parsed[0].status = 'current';
		setTextArray(parsed);
	};

	const setPuctuation = (bool: boolean) => {
		setPuctuationArray(bool);
		setTextArray(prev => {
			return prev.map(char => {
				if (isLetterChar(char.char)) {
					if (bool) {
						char.status == 'default';
					} else {
						char.status == 'hide';
					}
				}
				return char;
			});
		});
	};

	const setNumber = (bool: boolean) => {
		setNumberArray(bool);
		setTextArray(prev => {
			return prev.map(char => {
				if (isLetterChar(char.char)) {
					if (bool) {
						char.status == 'default';
					} else {
						char.status == 'hide';
					}
				}
				return char;
			});
		});
	};

	return {
		text,
		isNumber,
		isPuctuation,
		setStatus,
		setText,
		setPuctuation,
		setNumber,
		getRandomText,
	};
};

type TypeText = 'russian' | 'english' | 'number';

type Text = {
	text: string;
	tag: TypeText[];
};

const texts: Text[] = [
	{
		text: `Adapted from "The Colors of Animals" by Sir John Lubbock in A Book of Natural History The color of animals is by no means a matter of chance; it depends on many considerations, but in the majority of cases tends to protect the animal from danger by rendering it less conspicuous. Perhaps it may be said that if coloring is mainly protective, there ought to be but few brightly colored animals. There are, however, not a few cases in which vivid colors are themselves protective. The kingfisher itself, though so brightly colored, is by no means easy to see. The blue harmonizes with the water, and the bird as it darts along the stream looks almost like a flash of sunlight.
`,
		tag: ['english'],
	},
	{
		text: `
The next point is the color of the mature caterpillars, some of which are brown. This probably makes the caterpillar even more conspicuous among the green leaves than would otherwise be the case. Let us see, then, whether the habits of the insect will throw any light upon the riddle. What would you do if you were a big caterpillar? Why, like most other defenseless creatures, you would feed by night, and lie concealed by day. So do these caterpillars. When the morning light comes, they creep down the stem of the food plant, and lie concealed among the thick herbage and dry sticks and leaves, near the ground, and it is obvious that under such circumstances the brown color really becomes a protection. It might indeed be argued that the caterpillars, having become brown, concealed themselves on the ground, and that we were reversing the state of things. But this is not so, because, while we may say as a general rule that large caterpillars feed by night and lie concealed by day, it is by no means always the case that they are brown; some of them still retaining the green color. We may then conclude that the habit of concealing themselves by day came first, and that the brown color is a later adaptation.`,
		tag: ['english'],
	},
	{
		text: `
Desert animals are generally the color of the desert. Thus, for instance, the lion, the antelope, and the wild donkey are all sand-colored. “Indeed,” says Canon Tristram, “in the desert, where neither trees, brushwood, nor even undulation of the surface afford the slightest protection to its foes, a modification of color assimilated to that of the surrounding country is absolutely necessary. Hence, without exception, the upper plumage of every bird, and also the fur of all the smaller mammals and the skin of all the snakes and lizards, is of one uniform sand color.”
`,
		tag: ['english'],
	},
	{
		text: `
The events unfolding on a tapestry took place in the years 1064 to 1066. Anglo-Saxon earl Harold Godwinson is depicted receiving the English crown from Edward the Confessor, a deathly ill English monarch. An invading Norman force is then shown, which soon engages Saxon forces in a bloody battle. Ultimately king Harold is slain, and English forces flee the battlefield. The last part of the tapestry was supposedly lost and a newer piece was added in its place roughly in 1810. `,
		tag: ['english'],
	},
	{
		text: `
		I remembered that I'd been reading something about Action Painting in America at breakfast yesterday and when I came in to the studio I was, I thought, in the necessary emotional condition, it was anger and a sort of despair.
So I threw a lump of crimson, the colour of anger, down on to the board. And then I threw down a lump of lemon chrome and stamped on it.
And then I was ashamed of myself for being so childish, and anyway that is not the way one wastes good paint, which is expensive. So I went on with my Jars in a Window, feeling tired and sad.`,
		tag: ['english'],
	},
	{
		text: `
		This is what I always say when Leila cleans the studio, and while I was saying it I looked round for the first time. The studio has a parquet floor, and to protect it I have a large piece of hardboard in front of my easel to catch the worst drips of paint.`,
		tag: ['english'],
	},
	{
		text: `
		But I have never had another show which sold like that first one, although I am a better painter than I was then. My work is as contemporary as any; of course it is; how can anyone intelligent and honest paint behind his time, deliberately or by accident? But more and more critics support what is called Action Painting and Other Art, when a painter is trying to be as different from anyone else as he can. Anyway, it has been clear ever since that first sell-out show that I have an old way of seeing things and am really an academic.`,
		tag: ['english'],
	},
	{
		text: `
		And then our acquaintance really began, and it began entirely on my initiative. There were plenty of porters, and I called one without difficulty from the window of the train. But as I got off, I saw Miss Bradley standing on the platform with two large very old suit-cases. The porters were passing her by.
I am quite sure that had she been an even slightly attractive woman, I should not have gone up to her, but she was so ugly, and looked so helpless that I approached her, and said: "My porter has a barrow. Would you like him to put your cases on it too?" Miss Bradley turned and looked at me.`,
		tag: ['english'],
	},
	{
		text: `
		Katherine Mansfield, an outstanding English short-story writer of the 20th century, was born in New Zealand in 1888 and died in 1923. She is the author of a number of excellent short stories which deal with human nature and psychology.
At the age of eighteen she decided to become a professional writer. Her first short stories appeared in Melbourne in 1907, but literary fame came to her in London after the publication of a collection of short stories called "In a German Pension".
Katherine Mansfield took a great interest in Russian literature, particularly in the works of Chekhov. In fact, she considered herself to be a pupil of the great Russian writer.`,
		tag: ['english'],
	},
];
