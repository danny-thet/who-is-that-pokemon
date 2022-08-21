import { Box, Text, Input } from "@chakra-ui/react";

type PokemonGuessBox = {
	displayName: string;
	guessName: string;
	scores: number;
	boxShadowColor: string;
	onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onEnterName: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const PokemonGuessBox = ({
	displayName,
	guessName,
	scores,
	boxShadowColor,
	onChangeName,
	onEnterName,
}: PokemonGuessBox) => {
	return (
		<Box
			w="500px"
			minH="450px"
			m="50px auto"
			borderRadius="4px"
			backgroundColor="white"
			boxShadow={`0px 0px 5px 5px ${boxShadowColor}`}
		>
			<Text
				p="10%"
				maxW="90%"
				minH="60%"
				fontSize="350%"
				fontFamily="Pokemon Solid"
				color="#375da9"
				css={{
					"-webkit-text-stroke": "3px #ffcc00",
				}}
			>
				{displayName}
			</Text>
			<Input
				mx="2px"
				w="70%"
				size="lg"
				border="2px"
				borderColor="lightgray"
				textAlign="center"
				color="tomato"
				focusBorderColor="tomato"
				placeholder="GUESS THE NAME"
				_placeholder={{ opacity: 0.4, color: "inherit" }}
				fontSize="150%"
				value={guessName}
				onChange={onChangeName}
				onKeyDown={onEnterName}
			/>
			<Text
				mt="10px"
				fontSize="250%"
				fontFamily="Pokemon Solid"
				color="black"
				css={{
					"-webkit-text-stroke": "3px #375da9",
				}}
			>
				Scores: {scores}
			</Text>
		</Box>
	);
};
