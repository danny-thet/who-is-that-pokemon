import { Box, Image } from "@chakra-ui/react";

type PokemonImageBox = {
	pokemonImage: string;
	imageTransition: string;
	imageFilter: string;
};

export const PokemonImageBox = ({
	pokemonImage,
	imageTransition,
	imageFilter,
}: PokemonImageBox) => {
	return (
		<Box
			w="380px"
			h="380px"
			mx="auto"
			marginTop="50px"
			bgImg="url(/background.png)"
			bgPos="center"
			bgRepeat="no-repeat"
			bgSize="cover"
			borderRadius="4px"
			boxShadow="0px 0px 5px 5px lightgray"
		>
			<Image
				w="400px"
				alt=""
				transition={imageTransition}
				filter={imageFilter}
				src={pokemonImage}
			/>
		</Box>
	);
};
