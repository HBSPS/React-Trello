import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
    margin: 10px 20px;
    text-align: center;
    width: 300px;
    position: absolute;
    top: -70px;
`;

const InputCat = styled.input`
    width: 100%;
    padding: 10px;
    background-color: ${(props) => props.theme.cardColor};
    border: none;
    border-radius: 5px;

    ::placeholder {
        color: ${(props) => props.theme.textColor};
    }
`;

interface ICatForm {
    category: string;
};

function Add() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<ICatForm>();
    const onValid = ({ category }: ICatForm) => {
        setToDos((allBoards) => {
            const data = {
                ...allBoards,
                [category]: []
            };

            return data;
        });
        setValue("category", "");
    };
    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <InputCat {...register("category", { required: true })} type="text" placeholder="Add a new category"/>
        </Form>
    );
};

export default Add;