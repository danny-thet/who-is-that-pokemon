import { Box, Button, Flex, Heading, Input, Spacer } from "@chakra-ui/react";
export const PokemonMain = () => {
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
					maxH="700px"
					border="2px"
					borderColor="white"
					borderRadius="4px"
					bgImg="url(/background.png)"
					bgPos="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					boxShadow="5px 5px white"
				/>
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
						Who is That Pokemon?
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
						></Input>
					</Box>
					<Box mx="auto" display="inline-block" my="30px" w="70%">
						<Flex justifyContent="space-between">
							<Heading as="h1">Scores: 0</Heading>
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
