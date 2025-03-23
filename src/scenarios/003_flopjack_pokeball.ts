import { pokemons } from "../constants/pokemons";
import WorldScene from "../scenes/WorldScene";
import { useUserDataStore } from "../stores/userData";
import {getTiledObjectProperty, handlePokeball } from "../utils/object";
import { openDialog } from "../utils/ui";



export default ([pokeball], scene: WorldScene) => {
  const { completeScenario, hasCompletedScenario } = useUserDataStore.getState();

  if (hasCompletedScenario(3) == true || hasCompletedScenario(2) == false) {
    return 0;
  }

  const pokemon_inside_id = getTiledObjectProperty("pokemon_inside", pokeball);
  const pokemon = pokemons.find(({ id }) => id === Number(pokemon_inside_id));
  const type = pokemon.type[0].toLowerCase();
  openDialog({
        content: `FLOPJACK: Perfecto, tu quieres un pokemon tipo ${type}, se llama ${pokemon.name}?`,
        image: `assets/images/pokemons/front/${pokemon.id}.png`,
        choices: ["Si", "No"],
        callback: async (choice) => {
          if (choice === "Si") {
            handlePokeball(scene, pokeball, () =>
              openDialog({
                content: `OAK: Este pokemon va perfectamente contigo`,
                callback: () => {
                  
                    completeScenario(3);
                },
              }),
            );
          }
        },
      });
};
