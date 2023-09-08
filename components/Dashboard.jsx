import {
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiCross, BiCrosshair, BiEdit, BiX } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addHandler = () => {
    axios
      .post('http://127.0.0.1:5000/api/todo', form)
      .then((res) => {
        toast({ title: res.data.message, status: 'success', isClosable: true, duration: 3000, position: 'top' });
      })
      .catch((err) => {
        console.log(err);
        toast({ title: err.response.data.message, status: 'success', isClosable: true, duration: 3000, position: 'top' });
      });
  };
  const deleteHanlder = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/todo/${id}`)
      .then((res) => {
        toast({ title: res.data.message, status: 'success', isClosable: true, duration: 3000, position: 'top' });
      })
      .catch((err) => {
        toast({ title: err.response.data.message, status: 'success', isClosable: true, duration: 3000, position: 'top' });
        console.log(err);
      });
  };
  const editHandler = (todo) => {
    setCurrentTodo(todo);
    onOpen();
  };
  const updateHanlder = (id) => {
    axios
      .put(`http://127.0.0.1:5000/api/todo/${id}`, currentTodo)
      .then((res) => {
        toast({ title: res.data.message, status: 'success', isClosable: true, duration: 3000, position: 'top' });
        onClose();
      })
      .catch((err) => {
        toast({ title: err.response.data.message, status: 'success', isClosable: true, duration: 3000, position: 'top' });
        console.log(err);
      });
  };
  const logoutHandler = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:5000/api/logout', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        toast({ title: 'Logged out', status: 'success', isClosable: true, duration: 3000, position: 'top' });
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/todo')
      .then((res) => {
        const todos = res.data.todos;
        setTodos(todos);
      })
      .catch((err) => console.log(err));
  }, [addHandler, updateHanlder]);
  return (
    <>
      <Container maxW={'container.xl'} minH={'100vh'} p={4} bgColor={'blackAlpha.800'}>
        <HStack justifyContent={'space-between'} w={'full'}>
          <Heading color={'whiteAlpha.700'} size={'md'}>
            {'Hi ' + localStorage.getItem('user')}
          </Heading>
          <Button variant={'solid'} colorScheme={'messenger'} onClick={logoutHandler}>
            Logout
          </Button>
        </HStack>
        <Divider mb={4} mt={4} />
        <VStack maxW={'40%'} margin={'auto'}>
          <Input
            color={'white'}
            placeholder='Title'
            focusBorderColor='white'
            name='title'
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <Textarea
            color={'white'}
            rows={6}
            placeholder='Description'
            focusBorderColor='white'
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            name='desc'
          />
          <Button w={'full'} colorScheme={'messenger'} variant={'solid'} onClick={addHandler}>
            Add Todo
          </Button>
        </VStack>
        {todos.map((todo, i) => (
          <VStack p={4} key={i}>
            <Input textTransform={'capitalize'} border={'none'} readOnly placeholder='Title' focusBorderColor='white' color={'white'} value={todo.title} />
            <HStack w={'full'}>
              <Textarea
                border={'none'}
                readOnly
                textTransform={'capitalize'}
                rows={1}
                placeholder='Description'
                focusBorderColor='white'
                color={'white'}
                value={todo.desc}
              />
              <Button colorScheme={'orange'} variant={'solid'} onClick={() => editHandler(todo)}>
                <BiEdit />
              </Button>
              <Button colorScheme={'red'} variant={'solid'} onClick={() => deleteHanlder(todo._id)}>
                <AiFillDelete />
              </Button>
            </HStack>
          </VStack>
        ))}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Update Todo</ModalHeader>
            <ModalBody>
              <VStack>
                <Input
                  placeholder='Title'
                  focusBorderColor='black'
                  name='title'
                  onChange={(e) => setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value })}
                  value={currentTodo ? currentTodo.title : ''}
                />
                <Textarea
                  rows={4}
                  placeholder='Description'
                  focusBorderColor='black'
                  onChange={(e) => setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value })}
                  name='desc'
                  value={currentTodo ? currentTodo.desc : ''}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button onClick={() => updateHanlder(currentTodo._id)} colorScheme='messenger'>
                  Change
                </Button>
                <Button onClick={onClose} colorScheme='red'>
                  <BiX />
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
