import React  from "react";
import { Container,Form,Button } from "react-bootstrap";
import './Credentials.css'
import  Admin  from "./Admin.jsx";
import  User  from "./User.jsx";

export default class Credentials extends React.Component {

    constructor() {
        super()
        this.state = {
            IS_USER_AUTHENTICATION_SUCCESSFUL : false,
            IS_ADMIN_AUTHENTICATION_SUCCESSFUL: false,
            IS_USER : true,
            UNIQUE_ID : '',
            ID : '',
            password : '',
            users:[],
            admins:[]
        }
    }

    componentDidMount() {

        fetch('http://localhost:4040/Users')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                users:data
            })
        })
        .catch((err)=>console.log(err))

        fetch('http://localhost:4040/Admins')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                admins:data
            })
        })
        .catch((err)=>console.log(err))
    }

    changeTitle = () => {
        this.setState({
            IS_USER : !this.state.IS_USER,
        })
    }

    handleChange = (event) => {
        let target = event.target;
        if(target.name === 'ID') {
            this.setState({
                ID: target.value
            })
        } else {
            this.setState({
                password: target.value
            })
        }
    }

    handleSubmit = (event) => {
            
        if(this.state.IS_USER) {
            let obj = this.state.users.find(this.checkUser)
            console.log(obj.id);
            if(obj !== undefined) {
                if(obj.Password === this.state.password) {
                    alert('Authentication Successful')
                    this.setState({
                        IS_USER_AUTHENTICATION_SUCCESSFUL : true,
                        UNIQUE_ID : obj.id
                    })
                    
                } else {
                    alert('Please Check Your Credentials')
                }
            } else {
                alert('User Not Found')       
            } 
        } else {
            let obj = this.state.admins.find(this.checkUser)
                if(obj !== undefined) {
                    if(obj.Password === this.state.password) {
                        alert('Authentication Successful')
                        this.setState({
                            IS_ADMIN_AUTHENTICATION_SUCCESSFUL : true
                        })
                    } else {
                        alert('Please Check Your Credentials')
                    }
                } else {
                    alert('Admin Not Found')       
                } 
        }
    }

    checkUser = (obj) => {
        if(obj.UserName === this.state.ID)
            return obj;
    }

    DisplayLoginComponent = () => {

        return(

            <Container className='margin-css'>
                <h3>{this.state.IS_USER?'User Login':'Admin Login'}</h3>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>{this.state.IS_USER?'User Id':'Admin Id'}</Form.Label>
                        <Form.Control type="text" placeholder="Enter Id" name = 'ID'  value = {this.state.ID} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  name = 'PASSWORD'  value = {this.state.password} onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="outline-danger" type="submit">
                        Login
                    </Button>

                    <Button variant="link" onClick = {this.changeTitle}>{this.state.IS_USER?'Admin?':'User?'}</Button>
                </Form>
            </Container>
        )
    }

    render() {

        if(this.state.IS_USER_AUTHENTICATION_SUCCESSFUL)
            return <User id = {this.state.UNIQUE_ID}/>
        else if(this.state.IS_ADMIN_AUTHENTICATION_SUCCESSFUL)
            return <Admin/>
        else
            return this.DisplayLoginComponent()
    }
}