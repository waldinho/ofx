import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'
import Quote from './Quote'

import { getRates } from '../api/getRates';
import { getCurrencies } from '../json/currencies';
import { getCountries } from '../json/countries';

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
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

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
        console.log('fromCurrency1: ', fromCurrency)
        console.log('toCurrency1: ', toCurrency)
        getRates(fromCurrency, toCurrency).then(res => res.json())
        .then((data) => {
          setRate(data)
          setLoading(false)
          setSubmission(true)
        })
        .catch(() => {
          setHasError(true)
          console.log('ERROR: Unsuccessful API call...')
        })
    }

    const errorMessage = hasError ? <p aria-label='loading'>Oops something went wrong...</p> : ''
    const nonSuccess = loading ? <div className='loader'><Loader type="Oval" color="#e40000" height={50} width={50} /></div> : errorMessage

    return (
        <>
        <Title><h1>Quick Quote</h1></Title>
            {submission 
            ? 
            <Result>
                <Quote 
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    amount={amount}
                    rate={rate.CustomerRate}
                />
                <button onClick={() => {setSubmission(false)}}>Get new quote</button>
            </Result>
            :
            <Wrapper>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Left>
                        <label>First name: <sup>*</sup></label>
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={e => {setFirstname(e.target.value)}}
                            required
                        />
                    </Left>
                    <Right>
                        <label>Last name: <sup>*</sup></label>
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
                    <label>Mobile phone: </label>
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
                            type="amount" 
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
                    value="Submit" 
                /> 
            </form>
            </Wrapper>
            }
        </>
    )
}

const Title = styled.div`{
    padding: 10vh 0 0 0;
    border-bottom: 3px solid #047db1;
    width: 80%;
    margin: 0 auto 1em auto;
    text-align: left;
    h1 {
        line-height: 0.5em;
        }
    }
`

const Result = styled.div`{
    button {
        border-color: #047db1;
        color: #fff;
        background-color: #047db1;
        border-radius: 50px;
        max-width: 210px;
        min-height: 44px;
        margin: 1em auto 2em auto;
        text-transform: uppercase;
        width: 100%;
    }
`
    
const Wrapper = styled.div`
    margin: 0 auto 2em auto;
    display: flex;
    justify-content: center;
    text-align: left;
    form {
        display: flex;
        flex-direction: column;
        background: #fefefe;
        border: 1px solid #ededed;
        width: 80%;
        input, select {
            border: 2px solid #ededed;
            box-sizing: border-box;
            color: #323232;
            font-size: 14px;
            height: 48px;
            line-height: 25.5px;
            padding: 10.5px 14px 14px 14px;
            font-family: 'Muli', sans-serif;
            margin: 1rem 0.75rem 0 1rem;
            @media screen and (min-width: 321px) {
                margin: 1rem;
            }
        }
        select {
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
            linear-gradient(to bottom, #ffffff 0%,#ffffff 100%);
            background-repeat: no-repeat, repeat;
            background-position: right .7em top 50%, 0 0;
            background-size: .65em auto, 100%;
            -o-appearance: none;
            -ms-appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        label {
            padding: 10.5px 14px 0 14px;
        }
        input.submit, button {
            border-color: #047db1;
            color: #fff;
            background-color: #047db1;
            border-radius: 50px;
            max-width: 210px;
            min-height: 44px;
            margin: 1em auto 2em auto;
            text-transform: uppercase;
            width: 100%;
        }
        sup {
            color: red;
        }
    }
`
const Row = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 600px) {
        flex-direction: row;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    @media screen and (min-width: 600px) {
        width: 50%;
    }
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    @media screen and (min-width: 600px) {
        width: 50%;
    }
`

const Full = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    input, select {
        width: 100%;
    }
    select {
        max-width: 100px;
    }
`

export default Form