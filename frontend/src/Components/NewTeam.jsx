import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NewTeam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    members: [], // Array to store selected user IDs
  });
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await axios.get('/api/users');
        setUserList(response.data.all);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchLists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMemberChange = (selectedMembers) => {
    setFormData((prevState) => ({
      ...prevState,
      members: selectedMembers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teams', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <Box p="4" borderWidth="1px" borderRadius="md">
      <h1>New Team</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="id" mb="4">
          <FormLabel>Team ID</FormLabel>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="name" mb="4">
          <FormLabel>Team Name</FormLabel>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="members" mb="4">
          <FormLabel>Members</FormLabel>
          <Select
            name="members"
            multiple
            value={formData.members}
            onChange={(e) => handleMemberChange(Array.from(e.target.selectedOptions, (option) => option.value))}
            placeholder="Select Members"
          >
            {userList.map((user) => (
              <option key={user.id} value={user.id}>{user.first_name+" "+user.last_name}</option>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Create Team
        </Button>
      </form>
    </Box>
  );
};

export default NewTeam;
