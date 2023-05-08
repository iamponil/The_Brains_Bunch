import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  display: inline-block;
  user-select: none;
`;

const Star = styled(FaStar)`
  color: ${({ active, color }) =>
    active.filled ? color : active.outlined ? "transparent" : "gray"};
  cursor: pointer;
`;

const StarRating = ({ rating, maxRating, color, onRatingChange }) => {
  const handleClick = (value) => {
    onRatingChange(value);
  };

  return (
    <Container>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          active={{ filled: i < rating, outlined: i === rating - 0.5 }} color={color}
          onClick={() => handleClick(i + 1)}
        />
      ))}
    </Container>
  );
};

StarRating.propTypes = {
  rating: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxRating: PropTypes.number,
  color: PropTypes.string,
  onRatingChange: PropTypes.func.isRequired,
};

StarRating.defaultProps = {
  maxRating: 5,
  color: "orange",
};

export default StarRating;
