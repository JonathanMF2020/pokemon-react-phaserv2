import { useUserDataStore } from "../stores/userData";
import { openDialog } from "../utils/ui";
import { BagItems } from "../ui/components/Bag";

export default () => {
  const { completeScenario, setObjectToBag, hasCompletedScenario } = useUserDataStore.getState();
  if (hasCompletedScenario(3) == false) {
    return 0;
  }
  openDialog({
    content: `MOM: Por cierto, toma creo que te serviran para todo tu nuevo recorrido;
    Has recibido unas zapatos para correr
    `,
    callback: () => {
      setObjectToBag(BagItems.RUNNING_SHOES,1);
      completeScenario(4);
    },
  });
};