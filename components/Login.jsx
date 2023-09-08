import { Button, Container, HStack, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const [form, setForm] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const loginHandler = () => {
    axios
      .post('http://127.0.0.1:5000/api/login', form)
      .then((res) => {
        toast({ title: 'Logged In', status: 'success', isClosable: true, duration: 3000, position: 'top' });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user.email);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        toast({ title: err.response.data.message, status: 'error', isClosable: true, duration: 3000, position: 'top' });
      });
  };

  return (
    <>
      <Container maxW={'container.md'} bgColor={'blackAlpha.800'} h={'100vh'} p={4}>
        <Heading textAlign={'center'} p={4} color={'whiteAlpha.700'} mt={'10'}>
          Login Now
        </Heading>
        <VStack maxW={'60%'} p={4} margin={'120px auto'}>
          <Input
            color={'white'}
            placeholder='Email'
            focusBorderColor='white'
            name='email'
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <Input
            color={'white'}
            placeholder='Password'
            focusBorderColor='white'
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            name='password'
          />
          <Button w={'full'} colorScheme={'messenger'} variant={'solid'} onClick={loginHandler}>
            Login
          </Button>
          <Button variant={'link'} color={'whiteAlpha.700'} alignSelf={'flex-end'}>
            <Link to={'/signup'}>Register Now</Link>
          </Button>
        </VStack>
      </Container>
    </>
  );
}

export default Login;
