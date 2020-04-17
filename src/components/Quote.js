import React from 'react';
import styled from 'styled-components';

const Quote = ({ fromCurrency, toCurrency, amount, rate}) => {
    const convertedAmount = rate * amount;
    return (
        <Wrapper>
            <h1>OFX customer rate: {rate}</h1>
            <p>From: {fromCurrency} {amount}</p>
            <p>To: {toCurrency} {convertedAmount}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`

}
`

export default Quote