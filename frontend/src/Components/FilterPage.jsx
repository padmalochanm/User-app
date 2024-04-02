import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';

function FilterPage({ applyFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState([]);
  const [domain, setDomain] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [isAvailableChecked, setIsAvailableChecked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/users');
        setGender(response.data.uniqueGenders);
        setDomain(response.data.uniqueDomains);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleApplyFilters = () => {
    const filters = {
      gender: selectedGender,
      domain: selectedDomain,
      available: isAvailableChecked,
    };
    applyFilters(filters);
    onClose();
  };

  const handleRemove = () => {
    setSelectedGender([]);
    setSelectedDomain([]);
    setIsAvailableChecked(false);
    onClose();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button colorScheme='teal' onClick={() => setIsOpen(true)}>
        Filter By
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent bg='gray.100'>
          <DrawerCloseButton />
          <DrawerHeader bg='teal.500' color='white'>
            Choose your filters
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <CheckboxGroup colorScheme='teal' value={selectedGender} onChange={setSelectedGender}>
                <p>by Gender</p>
                {gender && gender.map((option) => (
                  <Checkbox key={option} value={option}>
                    {option}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              <hr />
              <CheckboxGroup colorScheme='teal' value={selectedDomain} onChange={setSelectedDomain}>
                <p>by Domain</p>
                {domain && domain.map((option) => (
                  <Checkbox key={option} value={option}>
                    {option}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              <hr />
              <p>by Availability</p>
              <Checkbox isChecked={isAvailableChecked} onChange={(e) => setIsAvailableChecked(e.target.checked)}>
                Available
              </Checkbox>
            </Stack>
          </DrawerBody>

          <DrawerFooter bg='gray.200'>
            <Button variant='outline' mr={3} onClick={handleRemove}>
              Remove
            </Button>
            <Button colorScheme='teal' onClick={handleApplyFilters}>
              Apply
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FilterPage;
