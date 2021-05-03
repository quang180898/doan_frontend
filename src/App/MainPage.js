import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import React, { useState, useEffect } from 'react';
import Container from './Container';

const MainPage = (props) => {
    return (
       <div>
            <Header />
            <Container />
            <Footer/>
       </div>
    );
}

export default MainPage;