import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React from "react";

export default function MainNav(props) {
    const genres = props.genres
    return (
        <Navbar expand={'md'} bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">mkflix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Link className='mx-3 nav-link text-light ' to={'/'}>Places to stay</Link>*/}

                        <NavDropdown title="Movies&nbsp;" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action2">Now playing</NavDropdown.Item>
                            <NavDropdown.Item href="#action2">Top rated</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Popular</NavDropdown.Item>


                        </NavDropdown>
                        <NavDropdown title="TV Shows&nbsp;" id="navbarScrollingDropdown"
                                     className={'col-md-5 col-5'}>

                            <NavDropdown.Item href="#action2">Top rated</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Popular</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">On the air</NavDropdown.Item>


                        </NavDropdown>
                        <NavDropdown title="Genres&nbsp;" id="navbarScrollingDropdown"
                                     className={' col-12'}>

                            <div className="row dropdown-bg g-0">
                                {genres.map(genre => (
                                    <div className="col-4">
                                        <NavDropdown.Item href="#action4">{genre}</NavDropdown.Item>

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