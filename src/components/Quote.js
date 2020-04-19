import React from 'react';
import styled from 'styled-components';

import * as style from '../styleVars/variables.js';

const Quote = ({ fromCurrency, toCurrency, amount, rate }) => {
    const conversionRate = rate ? rate.CustomerRate : "";
    const originalAmount = amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    const convertedAmount = rate && amount ? rate.CustomerAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    return (
        <Wrapper>
            <p aria-label="OFX customer rate:">OFX customer rate:</p>
            <h2 aria-label={conversionRate}>{conversionRate}</h2>
            <p aria-label="From:">From: </p>
            <h3 aria-label={originalAmount}>{fromCurrency} <Blue>{originalAmount}</Blue></h3>
            <p aria-label="To:">To: </p>
            <h3 aria-label={convertedAmount}>{toCurrency} <Blue>{convertedAmount}</Blue></h3>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: left;
    flex-direction: column;
    margin: 2rem auto;
    max-width: 210px;
    line-height: 0.5rem;
    h2 {
        color: ${style.green};
        text-align: center;
    }
    p {
        font-size: ${style.lg};
    }
}
`

const Blue = styled.div`
    color: ${style.blue};
    display: inline;
}
`

export default Quote