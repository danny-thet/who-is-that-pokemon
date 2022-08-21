import { Box, Button, Flex, Heading, Input, Image } from "@chakra-ui/react";
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
				setGuessName("");
			}
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
			<Heading
				py="50px"
				as="h1"
				background="white"
				boxShadow="0px 0px 5px 5px lightgray"
				fontSize="400%"
			>
				Who is That Pokemon?
			</Heading>
			<Flex flexWrap="wrap" mx="auto" width="80%" h="100%" minH="80vh">
				<Box
					mx="auto"
					marginTop="50px"
					width="500px"
					minW="380px"
					minH="380px"
					maxH="500px"
					borderRadius="4px"
					bgImg="url(/background.png)"
					bgPos="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					boxShadow="0px 0px 5px 5px lightgray"
				>
					<Image
						src={pokemonImage}
						transition={imageTransition}
						filter={imageFilter}
						alt=""
					/>
				</Box>
				<Box
					w="500px"
					maxH="500px"
					mx="auto"
					my="50px"
					border="2px"
					borderColor="white"
					borderRadius="4px"
					backgroundColor="white"
					boxShadow=" 0px 0px 5px 5px tomato"
				>
					<Heading py="50px" fontSize="300%">
						{isShowPokemon ? pokemonName : hiddenName}
					</Heading>
					<Box>
						<Input
							border="2px"
							textAlign="center"
							borderColor="lightgray"
							color="tomato"
							focusBorderColor="tomato"
							placeholder="GUESS THE NAME"
							_placeholder={{ opacity: 0.4, color: "inherit" }}
							mx="5px"
							w="70%"
							value={guessName}
							onChange={handleOnChange}
							onKeyDown={handleEnter}
						/>
					</Box>
					<Box mx="auto" display="inline-block" my="30px" w="70%">
						<Flex justifyContent="space-between">
							<Heading as="h1">Scores: {scores}</Heading>
							<Box>
								<Button colorScheme="red" size="lg" onClick={handleOnClick}>
									Reset Scores
								</Button>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};
