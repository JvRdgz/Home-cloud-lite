import React, { Component } from 'react';
import { render } from 'react-dom';

class Prueba {
    render() {
        return(
            <h1>Hola Mundo desde REACT!</h1>
        )
    }
}

render(
    <Prueba/>
    , document.getElementById('app')
);