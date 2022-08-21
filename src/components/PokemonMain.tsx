import { Box, Flex, Input, Image, Text } from "@chakra-ui/react";
import { PokemonClient } from "pokenode-ts";
import React, { useEffect, useState } from "react";

const offset = 0;
const limit = 650;

export const PokemonMain = () => {
	// states
	const [pokemonName, setPokemonName] = useState<string>("");
	console.log(
		"🚀 ~ file: PokemonMain.tsx ~ line 11 ~ PokemonMain ~ pokemonName",
		pokemonName
	);
	const [pokemonImage, setPokemonImage] = useState<string>("");
	const [isShowPokemon, setIsShowPokemon] = useState<boolean>(false);
	const [scores, setScores] = useState<number>(0);
	const [guessName, setGuessName] = useState<string>("");

	// data
	const nameCharacterCounts = pokemonName.length ?? 0;
	const characterToHide = nameCharacterCounts - 2;
	const hiddenCharacter =
		characterToHide > 0 && new Array(characterToHide + 1).join(" _");
	const hiddenName = pokemonName?.slice(0, -characterToHide) + hiddenCharacter;
	const imageTransition = isShowPokemon ? "filter 1s ease-out" : "initial";
	const imageFilter = isShowPokemon ? "initial" : "brightness(0%)";

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
			}
			setGuessName("");
			setIsShowPokemon(true);
			setTimeout(async () => {
				setPokemonImage("");
				const newPokemonId = generateRandomNumber();
				await fetchPokemon(newPokemonId);
				setIsShowPokemon(false);
			}, 2000);
		}
	};

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGuessName(event.target.value);
	};

	const handleOnClick = () => {
		setScores(0);
	};

	return (
		<Box textAlign="center" h="100%" minH="100vh" backgroundColor="#FEF9E7">
			<Text
				py="16px"
				fontSize="10vh"
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
			<Flex flexWrap="wrap" mx="auto" width="80%" h="100%" minH="80vh">
				<Box
					mx="auto"
					marginTop="50px"
					w="380px"
					h="380px"
					borderRadius="4px"
					bgImg="url(/background.png)"
					bgPos="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					boxShadow="0px 0px 5px 5px lightgray"
				>
					<Image
						w="400px"
						src={pokemonImage}
						transition={imageTransition}
						filter={imageFilter}
						alt=""
					/>
				</Box>
				<Box
					w="500px"
					minW="380px"
					minH="500px"
					mx="auto"
					my="50px"
					border="2px"
					borderColor="white"
					borderRadius="4px"
					backgroundColor="white"
					boxShadow=" 0px 0px 5px 5px tomato"
				>
					<Text
						p="50px"
						fontSize="350%"
						minH="60%"
						fontFamily="Pokemon Solid"
						color="#375da9"
						css={{
							"-webkit-text-stroke": "3px #ffcc00",
						}}
					>
						{isShowPokemon ? pokemonName : hiddenName}
					</Text>
					<Box>
						<Input
							size="lg"
							border="2px"
							textAlign="center"
							borderColor="lightgray"
							color="tomato"
							focusBorderColor="tomato"
							placeholder="GUESS THE NAME"
							_placeholder={{ opacity: 0.4, color: "inherit" }}
							mx="2px"
							w="70%"
							value={guessName}
							onChange={handleOnChange}
							onKeyDown={handleEnter}
							fontSize="150%"
						/>
						<Text
							mt="10px"
							fontSize="6vh"
							fontFamily="Pokemon Solid"
							color="black"
							css={{
								"-webkit-text-stroke": "3px #375da9",
							}}
						>
							Scores: {scores}
						</Text>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};
