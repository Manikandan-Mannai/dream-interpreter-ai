import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
`;

const CardContent = styled.p`
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SeeMoreButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
`;

const DreamsCard = ({ dream }) => {
    const [expanded, setExpanded] = useState(false);
    const [visibleContent, setVisibleContent] = useState(dream.split(' ').slice(0, 200).join(' '));

    const toggleExpand = () => {
        setExpanded(!expanded);
        if (!expanded) {
            setVisibleContent(dream);
        } else {
            setVisibleContent(dream.split(' ').slice(0, 200).join(' '));
        }
    };

    return (
        <CardContainer>
            <CardContent>{visibleContent}</CardContent>
            {dream.split(' ').length > 200 && (
                <SeeMoreButton onClick={toggleExpand}>
                    {expanded ? 'Read less' : 'Read more'}
                </SeeMoreButton>
            )}
        </CardContainer>
    );
};

export default DreamsCard;
