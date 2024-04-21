import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import DreamsCard from './DreamsCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CSVData from '../dreams.csv';

const DreamsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Header = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input[type="text"] {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
    }

    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const DreamsList = styled.div`
    display: grid;
    grid-gap: 20px;
`;

const LoadButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
`;

const DreamsData = () => {
    const [dreams, setDreams] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCSVData = async () => {
            try {
                const response = await fetch(CSVData);
                const text = await response.text();
                const { data } = Papa.parse(text, { header: true });
                setDreams(data.map(row => row.dreams_text));
            } catch (error) {
                console.error('Error parsing data:', error);
            }
        };

        fetchCSVData();
    }, []);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <DreamsContainer>
            <Header>Dream Data</Header>
            <SearchBar>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button><FontAwesomeIcon icon={faSearch} /></button>
            </SearchBar>
            <DreamsList>
                {dreams
                    .filter(dream => dream && dream.toLowerCase().includes(searchTerm.toLowerCase()))
                    .slice(0, showMore ? undefined : 10)
                    .map((dream, index) => (
                        <DreamsCard key={index} dream={dream} />
                    ))}
            </DreamsList>
            {dreams.length > 10 && (
                <LoadButton onClick={toggleShowMore}>
                    {showMore ? 'Show less' : 'Show more'}
                </LoadButton>
            )}
        </DreamsContainer>
    );
};

export default DreamsData;
