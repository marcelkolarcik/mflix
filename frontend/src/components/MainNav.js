import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import DropdownLink from "../ui/DropdownLink";

export default function MainNav(props) {
    const genres = props.genres;
    const [closeDropdown, setCloseDropdown] = useState(false);
    const movieLinks = ['popular', 'top-rated', 'on-the-air'];

    const tvLinks = ['tv-popular', 'tv-top-rated', 'tv-on-the-air'];

    useEffect(() => {
        if (closeDropdown) {
            document.querySelector('div.dropdown-menu').classList.remove('show')
        }

    }, [closeDropdown])

    function closeDrop() {
        document.querySelector('div.dropdown-menu').classList.remove('show')
        console.log(document.querySelector('div.dropdown-menu').classList)
    }

    return (
        <Navbar expand={'md'} bg="dark" variant="dark">
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
                            {movieLinks.map((genre, idx) => (
                                <div key={idx} className="col">
                                    <NavLink

                                        onClick={() => document.querySelector('div.dropdown-menu').classList.remove('show')}
                                        className={'dropdown-item nav-link'}
                                        to={`/search/${genre}`}>
                                        {genre}
                                    </NavLink>

                                </div>
                            ))}


                        </NavDropdown>
                        <NavDropdown title="TV Shows&nbsp;" id="navbarScrollingDropdown"
                                     className={'col-md-5 col-5'}>
                            {tvLinks.map((genre, idx) => (
                                <div key={idx} className="col">
                                    <NavLink

                                        onClick={() => document.querySelector('div.dropdown-menu').classList.remove('show')}
                                        className={'dropdown-item nav-link'}
                                        to={`/search/${genre}`}>
                                        {genre}
                                    </NavLink>

                                </div>
                            ))}

                        </NavDropdown>
                        <NavDropdown title="Genres&nbsp;" id="navbarScrollingDropdown"
                                     className={' col-12'}>


                            <div className="row dropdown-bg g-0">
                                {genres.map((genre, idx) => (
                                    <div key={idx} className="col-4">
                                       <DropdownLink class={'dropdown-item nav-link'} searchTerm={genre} text={genre}/>


                                    </div>
                                ))}


                            </div>


                        </NavDropdown>
                    </Nav>

                    <Nav className="ms-auto">
                        <Form className="d-flex">
                            <InputGroup>

                                <FormControl id="inlineFormInputGroup" placeholder="Search"
                                             className={'dropdown-bg'}/>
                                <InputGroup.Text className={'search_btn'}>&#x1F50E;</InputGroup.Text>
                            </InputGroup>
                            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                Search
                            </Form.Label>
                        </Form>
                        <a className={'btn btn-outline-info mx-2 nav_link_color small mb-2 mb-sm-0'}>Sign-in</a>
                        <a className={'btn btn-info mx-2 text-light  register_btn'}>Register</a>
                    </Nav>

                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}