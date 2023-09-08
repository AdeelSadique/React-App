import { Button, Container, HStack, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
function Signup() {
  const [form, setForm] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const signupHandler = () => {
    axios
      .post('http://127.0.0.1:5000/api/register', form)
      .then((res) => {
        toast({ title: 'Account Created', status: 'success', isClosable: true, duration: 3000, position: 'top' });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user.email);
        navigate('/dashboard');
      })
      .catch((err) => {
        toast({ title: err.response.data.message, status: 'warning', isClosable: true, duration: 3000, position: 'top' });
        console.log(err);
      });
  };
  return (
    <>
      <Container maxW={'container.md'} bgColor={'blackAlpha.800'} h={'100vh'} p={4}>
        <Heading textAlign={'center'} p={4} color={'whiteAlpha.700'} mt={'10'}>
          Register Now.
        </Heading>
        <VStack maxW={'60%'} p={4} margin={'120px auto'}>
          <Input
            color={'white'}
            placeholder='Name'
            focusBorderColor='white'
            name='name'
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
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
          <Button w={'full'} colorScheme={'messenger'} variant={'solid'} onClick={signupHandler}>
            Signup
          </Button>
          <Button variant={'link'} color={'whiteAlpha.700'} alignSelf={'flex-end'}>
            <Link to={'/'}>Login Now</Link>
          </Button>
        </VStack>
      </Container>
    </>
  );
}

export default Signup;
