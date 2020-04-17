import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'
import Quote from './Quote'

import { getRates } from '../api/getRates';
import { getCurrencies } from '../json/currencies';

const Form = () => {
    
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState()
    const [submission, setSubmission] = useState(false)


    const [rate, setRate] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const currencies = getCurrencies().map((i) => {
        console.log('i: ', i)
        return (
            <option value={i.code}>{i.title}</option>
        )
    })

    console.log('rate: ', rate)

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
        <Wrapper>
            {submission 
            ? 
            <>
            <Quote 
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={amount}
                rate={rate.CustomerRate}
            />
            <button onClick={() => {setSubmission(false)}}>Get new quote</button>
            </>
            :
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='left'>
                        <label>First name: *</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={e => {setFirstname(e.target.value)}}
                            required
                        />
                    </div>
                    <div className='right'>
                        <label>Last name: *</label>
                        <input 
                            type="text" 
                            name="surnamname" 
                            onChange={e => {setSurname(e.target.value)}}
                            required
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='left'>
                        <label>Email: *</label>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={e => {setEmail(e.target.value)}} 
                            required
                        />
                    </div>
                    <div className='right'>
                        <label>Mobile phone: </label>
                        <input 
                            type="tel"
                            name="phone" 
                            onChange={e => {setPhone(e.target.value)}}
                            maxLength="13"
                            minLength="10"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='left'>
                        <label>From Currency: *</label>
                        <select
                            type="from"
                            name="from" 
                            onChange={e => {setFromCurrency(e.target.value)}}
                            required
                        >
                            {currencies}
                        </select>
                    </div>
                    <div className='right'>
                        <label>To Currency: </label>
                        <select
                            type="to"
                            name="to" 
                            onChange={e => {setToCurrency(e.target.value)}}
                            required
                        >
                            {currencies}
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='left'>
                        <label>Amount: *</label>
                        <input 
                            type="amount" 
                            name="amount" 
                            onChange={e => {setAmount(e.target.value)}} 
                            required
                        />
                    </div>
                </div>
                <input 
                    className='submit'
                    type="submit" 
                    value="Submit" 
                /> 
            </form>
            }
        </Wrapper>
    )
}
    
const Wrapper = styled.div`
    position: relative;
    top: 26vh;
    @media screen and (min-width: 600px) {
        top: 30vh;
    }
    color: #000;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    text-align: left;
    .thank__you {
        position: relative;
        top: 10vh;
    }
    form {
        display: flex;
        flex-direction: column;
        .row {
            display: flex;
            flex-direction: column;
            @media screen and (min-width: 600px) {
                flex-direction: row;
            }
            .left {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }
            .right {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }
            input {
                border: 2px solid #dadada;
                box-sizing: border-box;
                color: #323232;
                font-size: 18px;
                height: 48px;
                line-height: 25.5px;
                padding: 10.5px 14px 14px 14px;
                font-family: 'Muli', sans-serif;
                margin: 1rem 0.75rem 0 1rem;
                @media screen and (min-width: 321px) {
                    margin: 1rem;
                }
                min-width: 300px;
            }
            label {
                min-width: 300px;
                padding: 10.5px 14px 0 14px;
            }
        }
        input.submit {
            background: #333;
            color: #fff;
            border: 2px solid #dadada;
            box-sizing: border-box;
            font-size: 18px;
            height: 48px;
            line-height: 25.5px;
            font-family: 'Muli', sans-serif;
            margin: 2.5rem 0.75rem 0 1rem;
            @media screen and (min-width: 321px) {
                margin: 2.5rem 1rem;
            }
            @media screen and (min-width: 600px) {
                width: 150px;
            }
        }
    }
`

export default Form