import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import FilterPage from "./FilterPage";

function Header({ onSearch, onApplyFilters }) {
    const [filters, setFilters] = useState({});

    const handleApplyFilters = (selectedFilters) => {
        setFilters(selectedFilters);
        onApplyFilters(selectedFilters);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Input
                onChange={onSearch}
                placeholder="Enter User ID or Name"
                mb={2}
            />
            <Button colorScheme='teal'><a href="/newUser">Add new user</a></Button>
            <FilterPage applyFilters={handleApplyFilters} />
        </div>
    );
}

export default Header;
