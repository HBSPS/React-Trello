import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ITodo } from "../atoms";
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
    background-color: ${props => props.isDraggingOver ? "#f7f1e3" : props.draggingFromThisWith ? "#95afc0" : props.theme.boardColor};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;

    input {
        width: 100%;
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
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({toDo}: IForm) => {
        setValue("toDo", "");
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", { required: true })} type="text" placeholder={`Add Task on ${boardId}`}></input>
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