import { useEventsListeners } from "../../utils/events";

import { UIBase } from "../UI";
import { Audios } from "../../constants/assets";
import { UIEvents } from "../../constants/events";
import { useUIStore } from "../../stores/ui";
import { getAudioConfig } from "../../utils/audio";
import { useState } from "react";




export const Battle = ({ game }: UIBase) => {
  const UIStore = useUIStore();
  const [selectedChoice, setSelectedChoice] = useState<number>(0);
  const [information, setInformation] = useState<string>("");

  const renderContent = () => {
    if (selectedChoice === 0) {
      return <>
      <div className="figth button" onClick={() => setSelectedChoice(1)}><p>FIGTH</p></div>
      <div className="bag button" onClick={() => setSelectedChoice(2)}><p>BAG</p></div>
      <div className="pokemon button" onClick={() => setSelectedChoice(3)}><p>POKEMON</p></div>
      <div className="run button" onClick={() => {
        if (UIStore.battle.isOpen) {
          game.sound.stopAll();
          game.sound.play(Audios.PALLET_TOWN, getAudioConfig());
          game.scene.stop("Battle").start("World", {
            facingDirection: void 0,
            startPosition: void 0,
          });
          useUIStore.getState().toggleBattle();
        }
      }}><p>RUN</p></div>
    </>;
    } else if (selectedChoice === 1) {
      return <>

      <div onMouseEnter={() => setInformation("Placaje causa daño y no tiene ningún efecto secundario. Este movimiento tiene una potencia de 35 y una precisión del 95%. Placaje ahora tiene una potencia de 50 y una precisión del 100%")} className="figth button" onClick={() => setSelectedChoice(1)}><p className="title-item">PLACAJE <span className="item normal">NORMAL</span><br /><div className="pp-container">PP: 12/15</div></p></div>
      <div onMouseEnter={() => setInformation("Burbuja causa daño y tiene una probabilidad del 10% de bajar en un nivel la velocidad del objetivo")} className="bag button" onClick={() => setSelectedChoice(2)}><p className="title-item">BUBBLES <span className="item water">AGUA</span><br /><div className="pp-container">PP: 12/15</div></p></div>
      <div onMouseEnter={() => setInformation("Un ataque importante para cualquier pokemon 3 ")} className="pokemon button" onClick={() => setSelectedChoice(3)}><p className="title-item">ATAQUE 3 <span className="item">NORMAL</span><br /><div className="pp-container">PP: 12/15</div></p></div>
      <div onMouseEnter={() => setInformation("Un ataque importante para cualquier pokemon 4")} className="run button" onClick={() => setSelectedChoice(4)}><p className="title-item">ATAQUE 4 <span className="item">NORMAL</span><br /><div className="pp-container">PP: 12/15</div></p></div>
    </>;
    } else {
      return <></>;
    }
  };

  useEventsListeners(
    [
      {
        name: UIEvents.EXIT,
        callback: () => {
          if (UIStore.battle.isOpen) {
            game.sound.stopAll();
            game.sound.play(Audios.PALLET_TOWN, getAudioConfig());
            game.scene.stop("Battle").start("World", {
              facingDirection: void 0,
              startPosition: void 0,
            });
            useUIStore.getState().toggleBattle();
          }
        },
      },
    ],
    [UIStore.battle.isOpen],
  );

  return (
    <div
      className="battle_menu"
      style={{
        display: UIStore.battle.isOpen ? "block" : "none",
      }}
    >
    {selectedChoice >= 1 &&  <div className="action-bar"> <p className="action-bar-item" onClick={ () => setSelectedChoice(0)}>Volver</p></div>}
    {selectedChoice == 0 &&  <div className="action-bar-center"> <p className="action-bar-item-center" >¿Que deses hacer?</p></div>}
    <div className="main-battle">
        {renderContent()}
    </div>
    {selectedChoice > 0 && <div className="main-battle-info">
      <div className="button-read">{information}</div>
    </div>}

    </div>
  );
};
