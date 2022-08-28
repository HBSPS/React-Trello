import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
};

const Wrapper = styled.div`
  padding: 10px 0px;
  padding-top: 10px;
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 20px;
    padding-left: 20px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#95afc0" : props.draggingFromThisWith ? "#f7f1e3" : props.theme.boardColor};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
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
                {(magic, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} index={index} toDo={toDo} />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;