import type { NextPage } from "next";
import { PokemonMain } from "../src/components/PokemonMain";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<main className={styles.main}>
			<PokemonMain />;
		</main>
	);
};

export default Home;
