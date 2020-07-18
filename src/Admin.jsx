import React from "react";
import { Container,Form,Button } from "react-bootstrap";

export default class Admin extends React.Component {

    constructor() {
        super()
        this.state = {
            IS_ADD: true,
            id:'',
            title:'',
            isbn: '',
            pageCount: '',
            bookCount:'',
            delete_id:''
        }
    }

    setComponent=() => {
        this.setState({
            IS_ADD : !this.state.IS_ADD
        })
    }

    handleChange = (event) => {
        
        let target = event.target;
        if(target.name === 'ID') {
            this.setState({
                id: target.value
            })
        } else if(target.name === 'TITLE') {
            this.setState({
                title: target.value
            })
        } else if(target.name === 'ISBN') {
            this.setState({
                isbn: target.value
            })
        } else if(target.name === 'COUNT') {
            this.setState({
                pageCount: target.value
            })
        } else if(target.name === 'delete_id') {
            this.setState({
                delete_id: target.value
            })
        } else {
            this.setState({
                bookCount: target.value
            })
        }
    }

    handleSubmit = (event) => {

        fetch('http://localhost:4040/Books/',
        {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            id: this.state.id,
            title: this.state.title,
            isbn:  this.state.isbn,
            pageCount: this.state.pageCount,
            bookCount: this.state.bookCount
        })
        }
        )

    }

    handleDelete = (event) => {

        let url = 'http://localhost:4040/Books/' + this.state.delete_id

        fetch(url,
            {
            method: 'delete',
            }
        )
        .then((response)=>console.log(response))
        .catch((err)=>console.log(err))

    }

    displayAdminComponent() {

        return (
            <Container>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="formBasicId">
                        <Form.Label>Book Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Id" name = 'ID'  value = {this.state.id} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title"  name = 'TITLE'  value = {this.state.title} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicISBN">
                        <Form.Label>Book ISBN</Form.Label>
                        <Form.Control type="text" placeholder="Enter ISBN" name = 'ISBN'  value = {this.state.isbn} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCount">
                        <Form.Label>Page Count</Form.Label>
                        <Form.Control type="text" placeholder="Enter Page Count"  name = 'COUNT'  value = {this.state.pageCount} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicBookCount">
                        <Form.Label>Number Of Books</Form.Label>
                        <Form.Control type="text" placeholder="Enter Value"  name = 'BOOK_COUNT'  value = {this.state.bookCount} onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="outline-danger" type="submit">
                        Add Book
                    </Button>
                    <Button variant="link" onClick = {this.setComponent}>Delete Book</Button>

                </Form>
            </Container>
        )

    }

    displayDeleteComponent=() =>{

        return (
            <Container>
                <Form onSubmit = {this.handleDelete}>
                    <Form.Group controlId="formBasicId">
                        <Form.Label>Book Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Id" name = 'delete_id'  value = {this.state.delete_id} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="outline-danger" type="submit">
                        Delete
                    </Button>
                    <Button variant="link" onClick = {this.setComponent}>Add Book</Button>
                </Form>
            </Container>
        )
    }

    render() {
        
            if (this.state.IS_ADD) {
                return this.displayAdminComponent()
            } else {
                return this.displayDeleteComponent()
            }
    }
}