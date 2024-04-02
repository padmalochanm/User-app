import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    domain: '',
    avatar: '',
    available: false,
  });
  const [genderList, setGenderList] = useState([]);
  const [domainList, setDomainList] = useState([]);

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await axios.get('/api/users');
        setGenderList(response.data.uniqueGenders);
        setDomainList(response.data.uniqueDomains);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchLists();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', formData, {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },});
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box p="4" borderWidth="1px" borderRadius="md">
      <h1>New User</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="id" mb="4">
          <FormLabel>id</FormLabel>
          <Input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="firstName" mb="4">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="lastName" mb="4">
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="gender" mb="4">
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Select Gender"
          >
            {genderList.map((gender) => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="domain" mb="4">
          <FormLabel>Domain</FormLabel>
          <Select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="Select Domain"
          >
            {domainList.map((domain) => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="avatar" mb="4">
          <FormLabel>Avatar</FormLabel>
          <Input
            type="text" // Assuming avatar is a URL string
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </FormControl>
        <Checkbox
          name="available"
          isChecked={formData.available}
          onChange={handleChange}
          mb="4"
        >
          Available
        </Checkbox>
        <Box>
        <Button type="submit" colorScheme="teal">
          Add User
        </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewUser;
