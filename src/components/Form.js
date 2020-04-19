import React, { useState } from 'react';
import styled from 'styled-components';
import Quote from './Quote'

import { getRates } from '../api/getRates';
import { getCurrencies } from '../json/currencies';
import { getCountries } from '../json/countries';
import * as style from '../styleVars/variables.js';

const Form = () => {
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [country, setCountry] = useState()
    const [phone, setPhone] = useState()
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState()
    const [submission, setSubmission] = useState(false)
    const [rate, setRate] = useState([])
    const [error, setError] = useState()
    const currencies = getCurrencies().map((i) => {
        return (
            <option value={i.code} key={i.code}>{i.title}</option>
        )
    })
    const countries = getCountries().map((i) => {
        return (
            <option value={i.code} key={i.name}>{i.code}</option>
        )
    })
    const handleSubmit = e => {
        e.preventDefault()
        getRates(fromCurrency, toCurrency, amount)
        .then((response) => {
            setRate(response)
            setSubmission(true)
        })
        .catch(() => {
            console.log('ERROR: Unsuccessful API call...')
            setError('ERROR: There was an problem processing your quote. Make sure you are exchanging different currencies.')
            setSubmission(false)
        })
    }
    return (
        <>
        <Title>
            <h1>Quick Quote</h1>
        </Title>
        {submission 
        ? 
        <Result>
            <Quote 
                firstname={firstname}
                surname={surname}
                email={email}
                country={country}
                phone={phone}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={amount}
                rate={rate}
            />
            <button onClick={() => {setSubmission(false)}}>Get new quote</button>
        </Result>
        :
        error ?
        <Error>
            <p aria-label={error}>{error}</p>
            <button onClick={() => {setError(false)}}>Get new quote</button>
        </Error>
        :
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Left>
                        <label>First Name: <sup>*</sup></label>
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={e => {setFirstname(e.target.value)}}
                            required
                        />
                    </Left>
                    <Right>
                        <label>Last Name: <sup>*</sup></label>
                        <input 
                            type="text" 
                            name="surnamname" 
                            onChange={e => {setSurname(e.target.value)}}
                            required
                        />
                    </Right>
                </Row>
                <Column>
                    <label>Email: </label>
                    <Full>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={e => {setEmail(e.target.value)}} 
                        />
                    </Full>
                </Column>
                <Column>
                    <label>Telephone / Mobile: </label>
                    <Full>
                        <select
                            type="country"
                            name="country" 
                            onChange={e => {setCountry(e.target.value)}}
                        >
                            {countries}
                        </select>
                        <input 
                            type="tel"
                            name="phone" 
                            onChange={e => {setPhone(e.target.value)}}
                            maxLength="13"
                            minLength="10"
                        />
                    </Full>
                </Column>
                <Row>
                    <Left>
                        <label>From Currency: <sup>*</sup></label>
                        <select
                            type="from"
                            name="from" 
                            onChange={e => {setFromCurrency(e.target.value)}}
                            required
                        >
                            {currencies}
                        </select>
                    </Left>
                    <Right>
                        <label>To Currency: <sup>*</sup></label>
                        <select
                            type="to"
                            name="to" 
                            onChange={e => {setToCurrency(e.target.value)}}
                            required
                        >
                            {currencies}
                        </select>
                    </Right>
                </Row>
                <Row>
                    <Left>
                        <label>Amount: <sup>*</sup></label>
                        <input 
                            type="number" 
                            name="amount" 
                            onChange={e => {setAmount(e.target.value)}} 
                            required
                            className="amount"
                        />
                    </Left>
                </Row>
                <input 
                    className='submit'
                    type="submit" 
                    value="Get Quote" 
                /> 
            </form>
        </Wrapper>
        }
        </>
    )
}

const Title = styled.div`{
    padding: 10vh 0 0 0;
    border-bottom: 3px solid ${style.blue};
    ${style.width}
    margin: 0 auto 1em auto;
    text-align: left;
    h1 {
        line-height: 0.5em;
        }
    }
`

const Result = styled.div`{
    ${style.width}
    margin: 0 auto;
    button {
        ${style.button}
    }
`

const Error = styled.div`{
    ${style.width}
    color: ${style.red};
    margin: 2em auto 0 auto;
    button {
        ${style.button}
    }
`
    
const Wrapper = styled.div`
    margin: 0 auto 2em auto;
    display: flex;
    justify-content: center;
    text-align: left;
    form {
        ${style.column}
        background: ${style.lighter};
        border: 1px solid ${style.light};
        ${style.width}
        input, select {
            border: 2px solid ${style.light};
            box-sizing: border-box;
            color: ${style.grey};
            font-size: ${style.md};
            height: 48px;
            line-height: 25.5px;
            padding: 10.5px 14px 14px 14px;
            margin: 1rem 0.75rem 0 1rem;
            font-family: 'Abel', Arial, Verdana, sans-serif;
            @media screen and (min-width: ${style.mobile}) {
                margin: 1rem;
            }
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type=number] {
            -moz-appearance: textfield;
        }
        select {
            ${style.hideArrow}
        }
        label {
            padding: 10.5px 14px 0 14px;
        }
        input.submit, button {
            ${style.button}
        }
        sup {
            color: ${style.red};
        }
    }
`
const Row = styled.div`
    ${style.column}
    @media screen and (min-width: ${style.desktop}) {
        flex-direction: row;
    }
`

const Column = styled.div`
    ${style.column}
`

const Left = styled.div`
    ${style.column}
    justify-content: flex-start;
    width: 100%;
    @media screen and (min-width: ${style.desktop}) {
        width: 50%;
    }
`

const Right = styled.div`
    ${style.column}
    justify-content: flex-end;
    @media screen and (min-width: ${style.desktop}) {
        width: 50%;
    }
`

const Full = styled.div`
    ${style.row}
    justify-content: flex-start;
    input, select {
        width: 100%;
    }
    select {
        max-width: 100px;
    }
`

export default Form