import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, {useRef} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import DropdownLink from "../ui/DropdownLink";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from '../auth/firebase';

export default function MainNav(props) {
    const [user] = useAuthState(auth);
    const genres = props.genres;

    const movieLinks = ['popular', 'top-rated', 'on-the-air'];

    const tvLinks = ['popular', 'top-rated', 'on-the-air'];
    const _search = useRef();
    const navigate = useNavigate();

    function onSearch() {
        const searchTerm = _search.current.value
        if (searchTerm) {
            navigate('/search/term/' + searchTerm)
            _search.current.value = ''
        } else {
            alert('Search term is missing')
        }
        console.log(_search.current.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        onSearch();
    }

    return (
        <Navbar expand={'md'} bg="dark" variant="dark" sticky={'top'}>
            <Container>
                <NavLink
                    className={'navbar navbar-brand'}
                    to={`/`}>
                    mkFLIX
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Link className='mx-3 nav-link text-light ' to={'/'}>Places to stay</Link>*/}

                        <NavDropdown title="Movies&nbsp;" id="navbarScrollingDropdown">
                            {movieLinks.map((sort, idx) => (
                                <div key={idx} className="col">
                                    <NavLink

                                        onClick={() => document.querySelector('div.dropdown-menu').classList.remove('show')}
                                        className={'dropdown-item nav-link'}
                                        to={`/search/movie/${sort}`}>
                                        {sort}
                                    </NavLink>

                                </div>
                            ))}


                        </NavDropdown>
                        <NavDropdown title="TV Shows&nbsp;" id="navbarScrollingDropdown"
                                     className={'col-md-5 col-5'}>
                            {tvLinks.map((sort, idx) => (
                                <div key={idx} className="col">
                                    <NavLink

                                        onClick={() => document.querySelector('div.dropdown-menu').classList.remove('show')}
                                        className={'dropdown-item nav-link'}
                                        to={`/search/series/${sort}`}>
                                        {sort}
                                    </NavLink>

                                </div>
                            ))}

                        </NavDropdown>
                        <NavDropdown title="Genres&nbsp;" id="navbarScrollingDropdown"
                                     className={' col-12'}>


                            <div className="row dropdown-bg g-0">
                                {genres.map((genre, idx) => (
                                    <div key={idx} className="col-4">
                                        <DropdownLink class={'dropdown-item nav-link'} field={'genres'}
                                                      searchTerm={genre} text={genre}/>


                                    </div>
                                ))}


                            </div>


                        </NavDropdown>
                    </Nav>

                    <Nav className="ms-auto">
                        <Form className="d-flex" onSubmit={onSubmit}>
                            <InputGroup>

                                <FormControl id="inlineFormInputGroup"
                                             ref={_search}
                                             placeholder="Search"
                                             className={'dropdown-bg'}/>
                                <InputGroup.Text className={'search_btn'} onClick={onSearch}>&#x1F50E;</InputGroup.Text>
                            </InputGroup>
                            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                Search
                            </Form.Label>
                        </Form>

                        {user ?
                            <NavLink
                                    className='login_btn btn btn-outline-info mx-2  small mb-2 mb-sm-0'
                                    to={'/dashboard'}>
                                    Dashboard
                                </NavLink>
                            :
                            <>
                                <NavLink
                                    className='login_btn btn btn-outline-info mx-2 nav_link_color small mb-2 mb-sm-0'
                                    to={'/login'}>
                                    Sign In
                                </NavLink>
                                <NavLink className='btn btn-info mx-2 text-light  register_btn'
                                         to={'/register'}>Register</NavLink>
                            </>}


                    </Nav>

                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}