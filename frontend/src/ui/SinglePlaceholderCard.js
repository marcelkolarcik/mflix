import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import React from "react";
import defaultImg from '../ui/images/placeholder_img.jpg'

export default function SinglePlaceholderCard(props) {
    return (
        <Card key={props.id}>
            <Placeholder as={Card.Img} src={defaultImg} animation={'wave'}/>
            <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={12} size={'xl'}/>
            </Placeholder>
            <Card.Body>
                <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={6}/>
                </Placeholder>
                <Placeholder as={Card.Text} animation="wave">
                    <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                    <Placeholder xs={6}/> <Placeholder xs={8}/>
                </Placeholder>

            </Card.Body>
        </Card>
    );
}