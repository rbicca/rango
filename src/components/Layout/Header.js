import classes from './Header.module.css';
import headerImage from '../../assets/meals.jpg';
import HeaderCardButton from './HeaderCartButton';

const Header = () =>{
    return(
        <>
            <header className={classes.header}>
                <h1>Restaurante Rango</h1>
                <HeaderCardButton />
            </header>
            <div className={classes['main-image']}>
                <img src={headerImage} alt="Mesa com boa boia"/>
            </div>
        </>
    );
}

export default Header;