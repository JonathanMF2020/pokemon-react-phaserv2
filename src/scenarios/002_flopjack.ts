import { useUserDataStore } from "../stores/userData";
import { openDialog } from "../utils/ui";

export default () => {
  const { completeScenario, hasCompletedScenario } = useUserDataStore.getState();

  console.log(hasCompletedScenario(1));
  if (hasCompletedScenario(1) == false) {
    return 0;
  }

  openDialog({
    content: `FLOPJACK: Bienvenido a mi laboratorio; En el podras ver 3 tipos de pokemons;
        Uno de agua, fuego, hierba, ellos te acompañaran...;
        A lo largo de tu historia, te aconsejo ser muy selectivo...;
        Sobre quien te acompañara
    `,
    callback: () => {
        completeScenario(2)
    },
  });
};
