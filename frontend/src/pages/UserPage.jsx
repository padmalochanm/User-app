import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import Pagination from '../Components/Pagination';
import Header from '../Components/Header';

function UserPage() {
    const [users, setUsers] = useState([]);
    const [currpage, setCurrPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                let response;
                if (searchTerm) {
                    if (!isNaN(searchTerm)) {
                        response = await axios.get(`/api/users/${searchTerm}`);
                        setCurrPage(1);
                        setUsers([response.data]);
                    } else {
                        response = await axios.get(`/api/users?name=${searchTerm}`);
                        setCurrPage(1);
                        setUsers(response.data.results);
                    }
                } else if (Object.entries(filter).length>0) {
                    console.log(filter);
                    let query = `/api/users?`;
                    if (filter.gender && filter.gender.length>0) {
                        query += `gender=${filter.gender}&`;
                    }
                    if (filter.domain && filter.domain.length>0) {
                        query += `domain=${filter.domain}&`;
                    }
                    if (filter.available) {
                        query += `available=${filter.available}&`;
                    }
                    query += `page=${currpage}`;
                    console.log(query);
                    response = await axios.get(query); 
                    setUsers(response.data.results);
                } else {
                    response = await axios.get(`/api/users?page=${currpage}`);
                    setUsers(response.data.results);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [searchTerm, filter, currpage]);

    

    function createCard(user) {
        return (
            <Card
                key={user.id}
                id={user.id}
                name={`${user.first_name} ${user.last_name}`}
                img={user.avatar}
                gender={user.gender}
                email={user.email}
                domain={user.domain}
                isAvailable={user.available}
            />
        );
    }

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    const handleFilter = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const paginate = (pageNumber) => {
        setCurrPage(pageNumber);
    };

    return (
        <div>
            <Header onSearch={handleSearch} onApplyFilters={handleFilter} />
            <div className='userList'>
                {users.map(createCard)}
            </div>
            <div className='pagination'>
                <Pagination currPage={currpage} paginate={paginate} />
            </div>
        </div>
    );
}

export default UserPage;
