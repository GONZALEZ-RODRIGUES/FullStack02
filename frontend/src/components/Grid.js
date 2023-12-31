import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";


const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thread = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  display: table-cell; // Adicione esta linha
  @media (max-width 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  display: table-cell; // Adicione esta linha
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;


const Grid = ({ users, setUsers, setOnEdit }) => {



    const handlerEdit = (item) => {
        setOnEdit(item);
    }

    const handlerDelete = async (id) => {
        await axios.delete("http://localhost:3000/" + id)
            .then(( { data }) => {
                const newArray = users.filter((user) => user.id !== id );

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
    }


    return (
        <Table>
            <Thread>
                <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Phone Number</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thread>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        
                        <Td width="30%">{item.full_name}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="23%" onlyWeb>{item.phone_number}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handlerEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handlerDelete(item.id)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>

    );
};

export default Grid;
