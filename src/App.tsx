import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    // 목적지가 정상적이지 않은 경우
    if (!destination) return;

    // 같은 보드안에서 순서를 바꾸는 경우
    if (destination?.droppableId === source.droppableId) {
      setToDos((oldBoards) => {
        const boardCopy = [...oldBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...oldBoards,
          [source.droppableId]: boardCopy
        };
      });
    };

    // 다른 보드로 이동하는 경우
    if (destination.droppableId !== source.droppableId) {
      setToDos((oldBoards) => {
        const sourceBoard = [...oldBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...oldBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...oldBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        };
      });
    };
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default App;