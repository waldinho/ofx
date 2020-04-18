import React from 'react';
import styled from 'styled-components';

const Quote = ({ fromCurrency, toCurrency, amount, rate}) => {
    const convertedAmount = rate * amount;
    return (
        <><h1>Quick Quote</h1>
        <Wrapper>
            <h2>OFX customer rate: {rate}</h2>
            <p>From: {fromCurrency} {amount}</p>
            <p>To: {toCurrency} {convertedAmount}</p>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`

}
`

export default Quote