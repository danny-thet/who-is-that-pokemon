import { Box, Text } from "@chakra-ui/react";
import { PokemonClient } from "pokenode-ts";
import React, { useEffect, useState } from "react";
import { PokemonGuessBox } from "./PokemonGuessBox";
import { PokemonImageBox } from "./PokemonImageBox";

const offset = 0;
const limit = 650;

export const PokemonMain = () => {
	// states
	const [pokemonName, setPokemonName] = useState<string>("");
	const [pokemonImage, setPokemonImage] = useState<string>("");
	const [isShowPokemon, setIsShowPokemon] = useState<boolean>(false);
	const [scores, setScores] = useState<number>(0);
	const [guessName, setGuessName] = useState<string>("");
	const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);

	// data
	const nameCharacterCounts = pokemonName.length ?? 0;
	const characterToHide = nameCharacterCounts - 2;
	const hiddenCharacter =
		characterToHide > 0 && new Array(characterToHide + 1).join(" _");
	const hiddenName = pokemonName?.slice(0, -characterToHide) + hiddenCharacter;
	const imageTransition = isShowPokemon ? "filter 1s ease-out" : "initial";
	const imageFilter = isShowPokemon ? "initial" : "brightness(0%)";
	const displayName = isShowPokemon ? pokemonName : hiddenName;
	const boxShadowColor = isCorrectAnswer ? "green" : "tomato";

	// fetching data
	const fetchPokemon = async (pokemonId: number) => {
		const api = new PokemonClient();
		await api
			.getPokemonById(pokemonId)
			.then((data) => {
				setPokemonName(data?.name);
				setPokemonImage(data?.sprites?.front_shiny ?? "");
			})
			.catch((error) => console.error(error));
	};

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * (limit - offset + 1) + offset);
	};

	const randomPokemonId = generateRandomNumber();

	useEffect(() => {
		fetchPokemon(randomPokemonId);
	}, []);

	// events
	const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const answer = event.currentTarget.value;

		if (event.key === "Enter") {
			if (answer === pokemonName) {
				setScores(scores + 1);
				setIsCorrectAnswer(true);
			}
			setGuessName("");
			setIsShowPokemon(true);
			setTimeout(async () => {
				setPokemonImage("");
				const newPokemonId = generateRandomNumber();
				await fetchPokemon(newPokemonId);
				setIsShowPokemon(false);
				setIsCorrectAnswer(false);
			}, 2000);
		}
	};

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGuessName(event.target.value);
	};

	return (
		<Box textAlign="center" h="100%" minH="100vh" backgroundColor="#FEF9E7">
			<Text
				py="16px"
				fontSize="300%"
				background="white"
				fontFamily="Pokemon Solid"
				color="#ffcc00"
				boxShadow="0px 0px 5px 5px lightgray"
				css={{
					"-webkit-text-stroke": "3px #375da9",
				}}
			>
				Who is That Pokemon?
			</Text>
			<Box mx="auto" width="80%" h="100%" minH="100vh">
				<PokemonImageBox
					pokemonImage={pokemonImage}
					imageTransition={imageTransition}
					imageFilter={imageFilter}
				/>
				<PokemonGuessBox
					displayName={displayName}
					guessName={guessName}
					scores={scores}
					boxShadowColor={boxShadowColor}
					onChangeName={handleOnChange}
					onEnterName={handleEnter}
				/>
			</Box>
		</Box>
	);
};
