import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 10px;
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
    text-align: left;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 20px;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
};

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic) => (
                    <div ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} index={index} toDo={toDo} />
                        ))}
                        {magic.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;