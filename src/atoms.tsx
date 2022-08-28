import { atom } from "recoil";

interface IToDoState {
    [key: string]: string[];
};

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a", "b", "c"],
        "Doing": ["d", "e"],
        "Done": ["f"]
    }
});