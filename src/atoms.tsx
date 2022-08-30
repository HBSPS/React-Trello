import { atom } from "recoil";

export interface ITodo {
    id: number;
    text: string;
};

interface IToDoState {
    [key: string]: ITodo[];
};

const localStorageEffect = (key:string) => ({setSelf, onSet}: any) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    };
  
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        "Doing": [],
        "Done": []
    },
    effects: [
        localStorageEffect("Data")
    ]
});