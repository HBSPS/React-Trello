import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
};

const Wrapper = styled.div`
  padding-top: 10px;
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h2`
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    padding-left: 20px;
`;

const DeleteButton = styled.button`
    border: none;
    border-radius: 5px;
    text-align: right;
    background-color: ${(props) => props.theme.boardColor};
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    transition: background-color .2s ease-in-out;

    &:hover {
        background-color: #95afc0;
    }
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#95afc0" : props.theme.boardColor}; //#f7f1e3
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const Form = styled.form`
    margin: 10px 20px;
    text-align: center;
`;

const InputToDo = styled.input`
    width: 100%;
    padding: 10px;
    background-color: ${(props) => props.theme.cardColor};
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

    ::placeholder {
        color: ${(props) => props.theme.textColor};
    }
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
};

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo
        };
        setToDos((allBoards) => {
            const data = {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newToDo]
            };

            return data;
        });
        setValue("toDo", "");
    };
    const onClickDelete = (boardId: string) => {
        setToDos((allBoards) => {
            const copy = { ...allBoards }
            delete copy[boardId];
            return {
                ...copy
            };
        });
    };
    return (
        <Wrapper>
            <Header>
                <Title>{boardId}</Title>
                <DeleteButton onClick={() => onClickDelete(boardId)}>❌</DeleteButton>
            </Header>
            <Form onSubmit={handleSubmit(onValid)}>
                <InputToDo {...register("toDo", { required: true })} type="text" placeholder={`Add Task on ${boardId}`}></InputToDo>
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;