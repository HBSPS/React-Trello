import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging ? "#c7ecee" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "2px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDraggableCardProps {
    toDo: string;
    index: number;
};

function DraggableCard({ toDo, index }: IDraggableCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic, snapshot) => (
                <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(DraggableCard);