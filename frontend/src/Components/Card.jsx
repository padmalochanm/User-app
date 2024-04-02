import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import axios from 'axios';
import { HamburgerIcon } from '@chakra-ui/icons';

function Card(props) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${props.id}`);
      navigate("/");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="name">{props.id + " - > "+ props.name}</div>
        <div className="info">
          <div>{props.gender}</div>
          <div>{props.domain}</div>
          <div>{props.email}</div>
        </div>
      </div>
      <img src={props.img} alt={props.name} className="circle-img"/>
      <div className="menu-container">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='ghost'
            size='sm'
          />
          <MenuList>
            <MenuItem onClick={() => navigate("/update", {state: props})}>
              Update
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              Delete
            </MenuItem>            
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Card;
