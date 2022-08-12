import { Box, Flex, Input } from "@chakra-ui/react";
export const PokemonMain = () => {
	return (
		<Box textAlign="center" backgroundColor="blue" h="100%" minH="100vh">
			<Flex
				flexWrap="wrap"
				mx="auto"
				width="80%"
				borderLeft="2px"
				borderRight="2px"
				borderColor="white"
				h="100%"
				minH="100vh"
			>
				<Box
					mx="auto"
					marginTop="50px"
					width="400px"
					h="400px"
					border="4px"
					borderColor="white"
					borderRadius="4px"
					bgImg="url(/background.png)"
					bgPos="center"
					bgRepeat="no-repeat"
					bgSize="cover"
				/>
				<Box
					w="400px"
					h="400px"
					mx="auto"
					marginTop="50px"
					border="4px"
					borderColor="white"
					borderRadius="4px"
				>
					<Box>Title</Box>
					<Input border="2px" borderColor="gray" mx="5px" w="300px"></Input>
					<Box mx="auto" display="inline-block">
						<Flex>
							<Box>Streak</Box>
							<Box>Hints</Box>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};
