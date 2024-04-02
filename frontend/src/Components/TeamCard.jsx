import { Button } from '@chakra-ui/react';
import React from 'react';

function Card(props) {
  return (
    <div className="card">
      <div className="container">
        <div className="name">{props.id + " - > "+ props.name}</div>
      </div>
      <Button><a href='/details'>{">>"}</a></Button>
    </div>
  );
}

export default Card;
