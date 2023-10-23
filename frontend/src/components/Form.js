import axios from "axios";
import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";


const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex_wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radios: 5px;
    height: #40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    height: #42px;
    background-color: #2c73d2;
    color: white;
`;


const Form = ({ onEdit, setOnEdit, getUsers }) => {

    const ref = useRef();

    useEffect(()=>{
        if(onEdit) {
            const user = ref.current;

            //user.id = onEdit.id;
            user.email.value = onEdit.email;
            user.full_name.value = onEdit.full_name;
            user.phone_number.value = onEdit.phone_number;
        }
    }, [onEdit])

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
            !user.email.value ||
            !user.full_name.value ||
            !user.phone_number.value
        ) {
            return toast.warn("Fill all!")
        };

        if(onEdit) {
            await axios.put("http://localhost:3000/" + onEdit.id,  {
                full_name: user.full_name.value,
                email: user.email.value,
                phone_number: user.phone_number.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios.post("http://localhost:3000", {
                full_name: user.full_name.value,
                email: user.email.value,
                phone_number: user.phone_number.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
    
    
    user.full_name.value = "";
    user.phone_number.value = "";
    user.email.value = "";

    setOnEdit(null);
    getUsers();

    }

    return (
        <FormContainer ref={ref} onSubmit={handlerSubmit}>

            <InputArea>

            <Label>Name</Label>
            <Input name="full_name" />
            
            </InputArea>

            <InputArea>
            <Label>Email</Label>
            <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
            <Label>Phone Number</Label>
            <Input name="phone_number" />
            </InputArea>

            <Button type="submit">Save</Button>
        </FormContainer>
    );
}

export default Form;