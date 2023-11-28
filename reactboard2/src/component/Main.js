import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,} from 'reactstrap';
import {useState} from 'react';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }    
    return(
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/" className='mr-auto'><i><b>kosta.com</b></i></NavbarBrand>
                <NavbarToggler onClick={toggle} className='mr-auto'/>
                <Collapse isOpen={isOpen} navbar className="mr-auto"  >
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">로그인</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/join">회원가입</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/list">게시판</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Main;