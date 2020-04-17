import React from 'react';
import styled from 'styled-components';

const Header = () => {

    return (
        <Wrapper>
            <header className='App-header'>
                <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/9/94/OFX_Logo.svg' alt='OFX' title='OFX'/>
            </header>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.App-header {
    background-color: #fff;
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    min-width: 335px;
    padding: 2rem 0 0 0;
    position: fixed;
    top: 0;
    width: -webkit-fill-available;
    z-index: 2;
    .logo {
        width: 120px;
    }
}
`

export default Header