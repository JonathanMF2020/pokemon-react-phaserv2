import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import type { Direction } from "grid-engine";

import type { Maps } from "../constants/assets";
import { IPokemon } from "../constants/types";
import { generatePokemon } from "../utils/pokemon";

export interface IPosition {
  map: Maps;
  x?: number;
  y?: number;
  facingDirection: Direction;
}

export interface IInventoryObject {
  objectId: number;

  // The map where the object was collected
  collectedMap: Maps;
}

export interface ISettings {
  general: {
    enableSound: boolean;
  };
}

export interface IBagObject {
  objectId: number;
  ammout: number
}

export interface IUserDataStore {
  onBicycle: boolean;
  onRunning: boolean;
  position?: IPosition;
  inventory: IInventoryObject[];
  bags: IBagObject[];
  pokemons: IPokemon[];
  settings: ISettings;
  scenariosCompleted: number[];

  update: (state: Partial<IUserDataStore>) => void;
  addObjectToInventory: (objectId: number, currentMap: Maps) => void;
  setObjectToBag: (objectId: number, ammout: number) => void
  addPokemon: (id: number) => void;
  countPokemons: () => integer
  hasCompletedScenario: (scenarioId: number) => boolean;
  completeScenario: (scenarioId: number) => void;
}

export const useUserDataStore = create<IUserDataStore>()(
  devtools(
    persist(
      (set, get) => ({
        update: (updates: Partial<IUserDataStore>) => {
          set((state) => ({
            ...state,
            ...updates,
          }));
        },
        onBicycle: Boolean(false),
        onRunning: Boolean(false),
        inventory: [],
        bags: [],
        pokemons: [],
        settings: {
          general: {
            enableSound: Boolean(true),
          },
        },
        scenariosCompleted: [],

        addPokemon: (id: number) => {
          set((state) => ({
            ...state,
            pokemons: [...state.pokemons, generatePokemon(id)],
          }));
        },

        countPokemons:() => {
          return get().pokemons.length;
        },

        addObjectToInventory: (objectId: number, currentMap: Maps) => {
          set((state) => ({
            ...state,
            inventory: [
              ...state.inventory,
              {
                objectId,
                collectedMap: currentMap,
              },
            ],
          }));
        },

        setObjectToBag: (objectId: number, ammout: number) => {
          set((state) => ({
            ...state,
            bags: [
              ...state.bags,
              {
                objectId,
                ammout: ammout,
              },
            ],
          }));
        },

        hasCompletedScenario: (scenarioId: number) => {
          return get().scenariosCompleted.includes(scenarioId);
        },

        completeScenario: (scenarioId: number) => {
          set((state) => ({
            ...state,
            scenariosCompleted: [...state.scenariosCompleted, scenarioId],
          }));
          console.debug("[Scenario]  Scenario complete: "+scenarioId);
        },
      }),
      {
        name: "userData",
      },
    ),
  ),
);
