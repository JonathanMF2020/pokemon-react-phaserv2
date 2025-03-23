import { useUserDataStore } from "../stores/userData";
import { openDialog } from "../utils/ui";

export default () => {
  const { completeScenario } = useUserDataStore.getState();

  openDialog({
    content: `MOM: Hole Bienvenido a PokeHuntingMmo! Dentro podras jugar sin!;
        limitaciones, te aconsejo visitar el Discord y Foro
    `,
    callback: () => {
        completeScenario(1)
    },
  });
};
