import WorldScene from "../../scenes/WorldScene";
import { useUserDataStore } from "../../stores/userData";
import {
  convertObjectPositionToTilePosition,
  getTiledObjectProperty,
  handlePokeball,
  removeObject,
} from "../../utils/object";
import { openDialog } from "../../utils/ui";
import { pokemons } from "../../constants/pokemons";

import { Layers, Objects, Sprites } from "../../constants/assets";
import { Direction } from "grid-engine";
import { wait } from "../../utils/time";
import { useUIStore } from "../../stores/ui";

const weaknessMap = {
  1: 4,
  4: 7,
  7: 1,
};

export default ([pokeball], scene: WorldScene) => {
  const { hasCompletedScenario, completeScenario, countPokemons } =
    useUserDataStore.getState();

  if (hasCompletedScenario(3) || !hasCompletedScenario(2)) {
    return openDialog({
        content: `OAK: ¡Ese es mio!`});
  }

  const pokemon_inside_id = getTiledObjectProperty("pokemon_inside", pokeball);
  const pokemon = pokemons.find(({ id }) => id === Number(pokemon_inside_id));
  const type = pokemon.type[0].toLowerCase();
  console.log(countPokemons());
    openDialog({
      content: `OAK: So! You want the ${type} Pokemon, ${pokemon.name}?`,
      image: `assets/images/pokemons/front/${pokemon.id}.png`,
      choices: ["Yes", "No"],
      callback: async (choice) => {
        if (choice === "Yes") {
          handlePokeball(scene, pokeball, () =>
            openDialog({
              content: `OAK: This pokemon is really energetic!`,
              callback: () => {
                const otherPokeballs = scene.tilemap
                  .getObjectLayer(Layers.OBJECTS)
                  .objects.filter(({ name }) => name === Objects.POKEBALL);
                const bluePokeball = convertObjectPositionToTilePosition(
                  otherPokeballs.find(
                    (otherPokemon) =>
                      getTiledObjectProperty("pokemon_inside", otherPokemon) ===
                      String(weaknessMap[pokemon.id]),
                  ),
                );
                useUIStore.getState().freezedPlayer()
                
                scene.gridEngine
                  .moveTo(Sprites.BLUE, {
                    x: bluePokeball.x,
                    y: bluePokeball.y + 1,
                  })
                  .subscribe({
                    complete: async () => {
                      await wait(100);
                      scene.gridEngine.turnTowards(Sprites.BLUE, Direction.UP);
                      await wait(200);
  
                      openDialog({
                        content: "BLUE: I'll take this one, then!",
                        callback: () => {
                          removeObject(scene, bluePokeball);
                          useUserDataStore
                            .getState()
                            .addObjectToInventory(bluePokeball.id, scene.map);
                          useUIStore.getState().unFreezedPlayer()
                          completeScenario(3);
                        },
                      });
                    },
                  });
              },
            }),
          );
        }
      },
    });

  
};
