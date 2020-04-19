import React from 'react';
import styled from 'styled-components';

import * as style from '../json/variables.js';

const Header = () => (
    <Heading>
        <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/9/94/OFX_Logo.svg' alt='OFX' title='OFX'/>
    </Heading>
) 

const Heading = styled.div`
    background-color: ${style.white};
    min-height: 10vh;
    ${style.column}
    align-items: center;
    justify-content: center;
    font-size: calc(${style.sm} + 2vmin);
    color: ${style.white};
    min-width: 335px;
    position: fixed;
    top: 0;
    width: -webkit-fill-available;
    z-index: 2;
    border-bottom: 1px solid ${style.light};
    .logo {
        width: 120px;
    }
`

export default Header