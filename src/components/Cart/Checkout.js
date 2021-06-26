import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isTamanho8 = value => value.trim().length === 8;

const Checkout = (props) => {

    const txtNome = useRef();
    const txtEnder = useRef();
    const txtCEP = useRef();
    const txtCidade = useRef();

    const [valido, setValido] = useState({
        nome: true,
        ender: true,
        cep: true,
        cidade: true
    });

  const confirmHandler = (event) => {
    event.preventDefault();

    const nome = txtNome.current.value;
    const ender = txtEnder.current.value;
    const cep = txtCEP.current.value;
    const cidade = txtCidade.current.value;

    setValido({
        nome: !isEmpty(nome),
        ender: !isEmpty(ender),
        cep: isTamanho8(cep),
        cidade: !isEmpty(cidade)
    });

    const formIsValid = !isEmpty(nome) && !isEmpty(ender) && !isEmpty(cidade) && isTamanho8(cep);
    if(!formIsValid){

        return;
    }

    //Submit the form
    
    props.onConfirm({
        nome: nome,
        ender: ender,
        cep: cep,
        cidade: cidade
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${valido.nome ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={txtNome}/>
        { !valido.nome && <p>Informe o nome!</p>}
      </div>
      <div className={`${classes.control} ${valido.ender ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={txtEnder}/>
        { !valido.ender && <p>Informe o endereço!</p>}
      </div>
      <div className={`${classes.control} ${valido.cep ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={txtCEP} />
        { !valido.cep && <p>Informe um cep com 8 dígitos!</p>}
      </div>
      <div className={`${classes.control} ${valido.cidade ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={txtCidade} />
        { !valido.cidade && <p>Informe a cidade!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;