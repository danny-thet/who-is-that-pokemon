import { Box, Button, Flex, Heading, Input, Image } from "@chakra-ui/react";
import { Pokemon, PokemonClient } from "pokenode-ts";
import React, { useEffect, useState } from "react";

const offset = 0;
const limit = 650;

export const PokemonMain = () => {
	const [pokemonData, setPokemonData] = useState<Pokemon>();
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const pokemonName = pokemonData?.name;

	const characterCount = pokemonName?.length ?? 0;
	const toRemove = characterCount - 2;

	const toProduce = toRemove > 0 ? new Array(toRemove + 1).join(" _") : "";

	const hiddenName = pokemonName?.slice(0, -toRemove) + toProduce;

	const [scores, setScores] = useState<number>(0);

	const fetchPokemon = async (pokemonId: number) => {
		const api = new PokemonClient();
		await api
			.getPokemonById(pokemonId)
			.then((data) => setPokemonData(data))
			.catch((error) => console.error(error));
	};

	const generateRandomNumber = () => {
		const id = Math.floor(Math.random() * (limit - offset + 1) + offset);

		return id;
	};

	const randomId = generateRandomNumber();

	useEffect(() => {
		fetchPokemon(randomId);
	}, []);

	const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const answer = event.currentTarget.value;
		if (event.key === "Enter") {
			if (answer === pokemonData?.name) {
				setScores(scores + 1);
			}
			setIsCorrect(true);
			setTimeout(async () => {
				const newId = generateRandomNumber();
				await fetchPokemon(newId);
				setIsCorrect(false);
			}, 2000);
		}
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
					minH="300px"
					maxH="500px"
					borderRadius="4px"
					bgImg="url(/background.png)"
					bgPos="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					boxShadow="0px 0px 5px 5px lightgray"
				>
					{pokemonData && (
						<Image
							src={pokemonData?.sprites?.front_shiny ?? ""}
							filter="brightness(0%)"
							alt="Pokemon"
						/>
					)}
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
					boxShadow=" 5px 5px tomato"
				>
					<Heading py="50px" fontSize="300%">
						{isCorrect ? pokemonName : hiddenName}
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
							onKeyDown={(event) => handleEnter(event)}
						/>
					</Box>
					<Box mx="auto" display="inline-block" my="30px" w="70%">
						<Flex justifyContent="space-between">
							<Heading as="h1">Scores: {scores}</Heading>
							<Box>
								<Button colorScheme="red" size="lg">
									Next
								</Button>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};
