import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from '../Components/TeamCard';
import { Button, Input } from '@chakra-ui/react';

function TeamPage() {
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                let response;
                if (searchTerm) {
                  response = await axios.get(`/api/teams/${searchTerm}`);
                  setTeams([response.data]);
                }
                 else {
                    response = await axios.get(`/api/teams`);
                    setTeams(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [searchTerm]);

    

    function createTeamCard(team) {
        return (
            <TeamCard
                key={team.id}
                id={team.id}
                name={team.name}
                members = {team.members}
            />
        );
    }

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }
    return (
        <div>
            <Input onSearch={handleSearch}/>
            <div className='userList'>
                {teams.length>0 && teams.map(createTeamCard)}
            </div>
            <Button colorScheme='teal'><a href="/newTeam">Create Groups</a></Button>
        </div>
    );
}

export default TeamPage;
