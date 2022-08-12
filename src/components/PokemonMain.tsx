import { Box, Flex, Heading, Input } from "@chakra-ui/react";
export const PokemonMain = () => {
	return (
		<Box textAlign="center" h="100%" minH="100vh" backgroundColor="#FEF9E7">
			<Heading pt="50px" as="h1">
				Who is That Pokemon?
			</Heading>
			<Flex flexWrap="wrap" mx="auto" width="80%" h="100%" minH="100vh">
				<Box
					mx="auto"
					marginTop="50px"
					width="500px"
					minH="300px"
					maxH="500px"
					border="2px"
					borderColor="gray.200"
					borderRadius="4px"
					bgImg="url(/background.png)"
					bgPos="center"
					bgRepeat="no-repeat"
					bgSize="cover"
				/>
				<Box
					w="500px"
					maxH="500px"
					mx="auto"
					my="50px"
					border="2px"
					borderColor="gray.200"
					borderRadius="4px"
				>
					<Box>Title</Box>
					<Box>
						<Input border="2px" borderColor="gray" mx="5px" w="300px"></Input>
					</Box>
					<Box mx="auto" display="inline-block">
						<Flex>
							<Box>Scores</Box>
							<Box>Hints</Box>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};
