import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";

const DeleteArea = styled.div`
    width: 200px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    `;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#95afc0" : props.theme.boardColor}; //#f7f1e3
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
    position: absolute;
    bottom: -100px;
    border-radius: 5px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
};

function Delete() {
    return (
        <Droppable droppableId="delete">
            {(magic, snapshot) => (
                <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
                    <DeleteArea>
                        <BsTrash />
                    </DeleteArea>    
                </Area>
            )}
        </Droppable>
    );
};

export default Delete;