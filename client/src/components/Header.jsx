import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className='container'>
             <a className='navbar-brand' href='/'> 
                <div className="d-flex justify-content-center align-items-center">
                    <img className ="mx-2" src={Logo} alt="logo" height={50} width={50}/>
                    <div> Project Mgmt </div>
                </div>
             </a>
        </div>
    </nav>
  )
}

export default Header