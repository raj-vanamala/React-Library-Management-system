import React from 'react'
import { Container,Form,Button,Card } from "react-bootstrap";
import './User.css'


export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state =  {
            IS_AVAILABLE_BOOKS: true,
            issued_books:[],
            available_books:[],
            id:props.id
        }
        this.addBooks = this.addBooks.bind(this);
        this.returnBook = this.returnBook.bind(this);
        this.IssuedBooks = this.IssuedBooks.bind(this);
    }

    componentDidMount() {

        fetch('http://localhost:4040/Books')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                available_books:data
            })
        })
        .catch((err)=>console.log(err))
    }

    componentDidUpdate() {

        fetch('http://localhost:4040/Books')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                available_books:data
            })
        })
        .catch((err)=>console.log(err))
    }

    setComponent=() => {
        this.setState({
            IS_AVAILABLE_BOOKS : !this.state.IS_AVAILABLE_BOOKS
        })
        if(this.state.IS_AVAILABLE_BOOKS)
                this.IssuedBooks();
        console.log(this.state.IS_AVAILABLE_BOOKS);
    }

    header=() => {
        
        return (
            <Container>
                <Button  variant="outline-danger" onClick = {this.setComponent}>Available Books</Button>
                <Button variant="outline-danger" style = {{margin:'20px'}} onClick = {this.setComponent}>Your Books</Button>
            </Container>
        )
    }

    async IssuedBooks(){

         let data = await fetch('http://localhost:4040/Users/'+this.state.id)
                        .then((response)=>response.json())
                        .then((data)=>{
                            console.log(data.Issued_Books);
                            this.setState({
                                issued_books : data.Issued_Books
                            })
                        })
                        .catch((err)=>console.log(err))
    }

    displayIssuedBooks = () => {

        return (
            
            <Container className='flex-css'>
                {
                    this.state.issued_books.length === 0 ? <h1>No Books In Account</h1> :  this.state.issued_books.map((obj,id)=>

                        <Card border="success" className='width-css' key={id}>
                            <Card.Header>BOOK</Card.Header>
                            <Card.Body>
                            <Card.Text>
                                <div><b>Book Title:</b>{obj.title}</div> <br/>
                                <div><b>ISBN:</b>{obj.isbn}</div> <br/>
                                <div><Button variant='outline-success' onClick={()=>this.returnBook(obj,id)}>Return Book</Button></div>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                }
            </Container>
        )

        
    }

    async returnBook(obj,id){

        let temp = await this.updateIssuedBooks(obj,id);

        let data2 = await fetch('http://localhost:4040/Users/'+this.state.id,
                        {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            "Issued_Books" : temp
                        })
                        }
                        )
                        .then((response)=>{
                            response.json();
                            alert('Book has been Returned from  your Account')
                        })      
                        .catch((err)=>console.log(err))

        console.log(obj);

        let count = await fetch('http://localhost:4040/Books/' + obj.id)
                        .then((response)=>response.json())
                        .then((data)=>data.bookCount)
                        .catch((err)=>console.log(err))


        let data3 = await fetch('http://localhost:4040/Books/' + obj.id,
                        {
                        method: 'PATCH',                                                                                                                                                                                        
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            "bookCount" : count + 1
                        })
                        }
                        )
                        .then((response)=>{
                            response.json();
                        })      
                        .catch((err)=>console.log(err))
    }

    updateIssuedBooks = (obj,id) =>{
        let temp = this.state.issued_books;
        temp.splice(id,1);
        this.setState({
            issued_books : temp
        })
        return temp;
    }

    AvailableBooks = () => {

        return (
            <Container className='flex-css'>
                {
                    this.state.available_books.map((obj,id)=>

                        <Card border="success" className='width-css' key={id}>
                            <Card.Header>BOOK</Card.Header>
                            <Card.Body>
                            <Card.Text>
                                <div><b>Book Title:</b>{obj.title}</div> <br/>
                                <div><b>ISBN:</b>{obj.isbn}</div> <br/>
                                <div><b>ISBN:</b>{obj.isbn}</div> <br/>
                                <div><b>pageCount:</b>{obj.pageCount}</div> <br/> 
                                <div><b>bookCount:</b>{obj.bookCount}</div> <br/>
                                {obj.bookCount > 0?<div><Button variant='outline-success' onClick={()=>this.addBooks(obj)}>Add</Button></div>:<div><Button variant='outline-danger' disabled>Not Available</Button></div>}
                            </Card.Text>
                            </Card.Body>
                        </Card>

                    )
                }
            </Container>
        )
    }

    async addBooks(obj){

        let data1 = await fetch('http://localhost:4040/Users/'+this.state.id)
                            .then((response)=>response.json())
                            .catch((err)=>console.log(err))
                            
        let data2 = await fetch('http://localhost:4040/Users/'+this.state.id,
                        {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            "Issued_Books" : [...data1.Issued_Books, {
                                "id":obj.id,
                                "title": obj.title,
                                "isbn": obj.isbn
                                }]
                        })
                        }
                        )
                        .then((response)=>{
                            response.json();
                            alert('Book has been added to you Account')
                        })      
                        .catch((err)=>console.log(err))
                
        let data3 = await fetch('http://localhost:4040/Books/' + obj.id,
                        {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            "bookCount" : obj.bookCount - 1
                        })
                        }
                        )
                        .then((response)=>{
                            response.json();
                        })      
                        .catch((err)=>console.log(err))
        
    }

    render() {
        
        if(this.state.IS_AVAILABLE_BOOKS)
           return [<this.header/>,<this.AvailableBooks/>]
        else 
            return [<this.header/>,<this.displayIssuedBooks/>]

    }
}