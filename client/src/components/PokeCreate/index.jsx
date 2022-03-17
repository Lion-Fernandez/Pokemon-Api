import React, { useEffect, useState } from 'react';
import  {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPoke, getTypes } from '../../actions';
import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 80%;
    
    margin: 10px;
    border-radius: 24px;
    background: #f4d63e;
    box-shadow: inset 30px 30px 60px #b59e2e,
            inset -30px -30px 60px #ffff4e;
`;

const Title = styled.h1`
  font-family: "Courier New", Courier, monospace;
  font-size: 24px;
  letter-spacing: 2px;
  word-spacing: -4.4px;
  color: #596107;
  font-weight: 700;
  text-decoration: none solid rgb(68, 68, 68);
  font-style: normal;
  font-variant: normal;
  text-transform: uppercase;

`;
const Label = styled.label`
  font-size: 18px;
  font-weight: 300;
`;


const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`

  height: 4px;
  min-width: 5%;
  margin: 15px 10px 5px 5px;
  padding: 12px;
  border-radius: 12px;
  background: #eeb97c;
  box-shadow: inset 30px 30px 60px #b0895c,
            inset -30px -30px 60px #ffe99c;
`;

const Button = styled.button`
  width: 14%;
  margin-top: 12px;
  border: none;
  padding: 10px;
  background-color: #f49f3e;
  border-radius: 10px;
  cursor: pointer;

 &:disabled {
    background-color: gray;
    color: black;
    opacity: 0.7;
    cursor: default;
  }
`;

const Paragraph = styled.p`
  color: red;
  font-size: 15px;
  font-weight: 3;
`;

const Div = styled.div`
    display: flex,
    position: absolute,
    justify-content: space-around, 
    padding: 10px,  
`;

const linkStyle = {
   
    textDecoration: "none",
    color: 'inherit',
    width: '30%',
    padding: '3px'
    
}

function validate(input) {
    let errors = {};

    if (!input.nombre) {
      errors.nombre = 'Debe ingresar el nombre del Pokemon a crear';
    } else if (!/[a-zA-zá-ü]/.test(input.nombre)) {
      errors.nombre = 'Nombre no aceptado';
    }
    if (!input.vida) {
      errors.vida = 'Debe ingresar un valor numerico';
    } else if (!/^([1-9][0-9]?|100)$/.test(input.vida)) {
      errors.vida = 'Invalido, requiere valor numerico del 1 al 100';
    }
    if (!input.fuerza) {
      errors.fuerza = 'Debe ingresar un valor numerico';
    } else if (!/^([1-9][0-9]?|100)$/.test(input.fuerza)) {
      errors.fuerza = 'Invalido, requiere valor numerico del 1 al 100';
    }
    if (!input.defensa) {
      errors.defensa = 'Debe ingresar un valor numerico';
    } else if (!/^([1-9][0-9]?|100)$/.test(input.defensa)) {
      errors.defensa = 'Invalido, requiere valor numerico del 1 al 100';
    }
    if (!input.velocidad) {
      errors.velocidad = 'Debe ingresar un valor numerico';
    } else if (!/^([1-9][0-9]?|100)$/.test(input.velocidad)) {
      errors.velocidad = 'Invalido, requiere valor numerico del 1 al 100';
    }
    if (!input.altura) {
      errors.altura = 'Debe ingresar un valor numerico';
    } else if (!/^([1-9][0-9]?|100)$/.test(input.altura)) {
      errors.altura = 'Invalido, requiere valor numerico del 1 al 100';
    }
    if (!input.peso) {
      errors.peso = 'Debe ingresar un valor numerico';
    } else if (!/^([1-9][0-9]?|100)$/.test(input.peso)) {
      errors.peso = 'Invalido, requiere valor numerico del 1 al 100';
    }
    if (!input.img) {
      errors.img = 'Debe ingresar una url';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)) {
      errors.img = 'url invalida';
    }
    if (Object.keys(errors).length === 0) {
      errors.disabled = true
  }
  else errors.disabled = false

    return errors;
  };

export default function PokemonCreator() {
  
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state.tipos); 
    
    const [errors, setErrors]= useState({});
    const [input, setInput]= useState({
        nombre: "",
        vida: "",
        fuerza: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        img: "",
        tipos: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        let objErrors = validate({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(objErrors);
    };

    function handleCheck(e) {
        if(e.target.checked) {
            setInput({
                ...input,
            tipos: [
                ...input.tipos,
                e.target.value
            ]
            });
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postPoke(input))
        alert("Personaje cargado exitosamente! 👌😎👍")
        setInput({
            nombre: "",
            vida: "",
            fuerza: "",
            defensa: "",
            velocidad: "",
            altura: "",
            peso: "",
            img: "",
            tipos: [],
        });
        history.push('/pokemons')
    };


    useEffect(()=>{
        dispatch(getTypes())
    }, [dispatch])

    return (
      <Container>
        <Wrapper>
          <Title>Crea tu personaje</Title>
          <Form onSubmit={e => {handleSubmit(e)}}>
               <div>
                   <Label>Nombre:</Label>
                   <Input  
                       type='text' 
                       value= {input.nombre} 
                       name='nombre' 
                       onChange={e => handleChange(e)}
                   />
                   {errors.name && (
                            <Paragraph>{errors.nombre}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Vida:</Label>
                   <Input  
                       type='text' 
                       value= {input.vida} 
                       name='vida' 
                       onChange={e => handleChange(e)}
                   />
                   {errors.vida && (
                            <Paragraph>{errors.vida}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Fuerza:</Label>
                   <Input  
                       type='text' value= {input.fuerza} name='fuerza' 
                       onChange={e => handleChange(e)}
                   />
                   {errors.fuerza && (
                            <Paragraph>{errors.fuerza}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Defensa:</Label>
                   <Input
                       type='text' 
                       value= {input.defensa} 
                       name='defensa' 
                       onChange={e => handleChange(e)}
                   />
                  {errors.defensa && (
                            <Paragraph>{errors.defensa}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Velocidad:</Label>
                   <Input 
                       type='text' 
                       value= {input.velocidad} 
                       name='velocidad' 
                       onChange={e => handleChange(e)}
                   />
                  {errors.velocidad && (
                            <Paragraph>{errors.velocidad}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Altura:</Label>
                   <Input 
                       type='text' 
                       value= {input.altura} 
                       name='altura' 
                       onChange={e => handleChange(e)}
                   />
                    {errors.altura && (
                            <Paragraph>{errors.altura}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Peso:</Label>
                   <Input 
                       type='text' 
                       value= {input.peso} 
                       name='peso' 
                       onChange={e => handleChange(e)}
                   />
                  {errors.peso && (
                            <Paragraph>{errors.peso}</Paragraph>
                        )}
               </div>  
               <div>
                   <Label>Imagen:</Label>
                   <Input 
                       type='text' 
                       value= {input.img} 
                       name='img' 
                       onChange={e => handleChange(e)}
                   />
                   {errors.img && (
                            <Paragraph>{errors.img}</Paragraph>
                        )}
               </div>  
              </Form>
                   <Title>Tipos</Title> 
               <div>
                   {
                       types.map(t => (
                            <Label key={t.id} >
                       <input  type='checkbox' name={t.nombre} value={t.nombre}
                       onChange={e => handleCheck(e)}>
                   </input>{t.nombre}</Label>
                       ))
                   }
               </div>
               <Div>
                 <Button type='submit' disabled={!errors.disabled} onClick= {(e)=>handleSubmit(e)}> AGREGAR POKE</Button> 
                 <Link to= '/pokemons' style={linkStyle}> <Button>Volver</Button></Link>
               </Div>         
        </Wrapper>      
      </Container>

    )
}