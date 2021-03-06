import React, { Component } from "react"
import { Form, Container, Button, Image, Label, Icon } from 'semantic-ui-react'
import LoginManager from '../../modules/LoginManager'
import './Login.css'
import { withRouter } from 'react-router'

class Login extends Component {

  // Set initial state
  state = {
    email: "",
    password: ""
  }


  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

//handleLogin function fetches user's information from JSON using email
//   if the email doesn't exist, then an alert will pop up prompting the user to try again
// if the email exists, we then check the password and if the condition is true, we are setting userId, username and credential (email and password) in the localStorage
// then we get redirected to the Home page and the user can click on whatever page they want
// if the email exists, but password doesn't match, then an alert will appear notifying the user that the password doesn't match

  handleLogin = (e) => {
    e.preventDefault()
    console.log("I'm in the login function")

   LoginManager.loginAccount(this.state.email).then(user => {
    if(user.length === 0){
        window.alert(`I'm sorry! The email you entered is not in our system. Please try again!`)
    } else{
        if (this.state.password === user[0].password){
            localStorage.setItem("userId", user[0].id);
            localStorage.setItem("name", user[0].name);
            localStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
        this.props.history.push("/home");
        this.props.handleLoginForm()

        }
        else{
            window.alert(`I'm sorry! The password you entered does not exist with the email: ${this.state.email}  Please try again!`)
        }
    }
    
    })

  }

// rendering the login form

  render() {

    return (
      <>
      <br />
          <Container className="login-form center">
          <Image className="splash-image" src={require('./wanderlust-logo.png')} centered/>
          <p className="login-heading"><strong>Please sign in</strong></p>
            <Form 
            // onSubmit={this.handleLogin}
            >
              <Form.Field>
                <Label as='a' color='teal' size={'large'} ribbon>Email Address</Label>
                <input type="email" id="email" onChange={this.handleFieldChange} placeholder="Enter email" required="" />
              </Form.Field>
              <Form.Field>
                <Label as='a' color='teal' size={'large'} ribbon>Password</Label>
                <input type="password" id="password" onChange={this.handleFieldChange} placeholder="Password" required=""/>
              </Form.Field>
              <div className="button-row">
                <Button color='green' type="submit" onClick={this.handleLogin}>
                  <Icon name='send' size={'large'} /> Submit
                </Button>
                <Button color='red' onClick={()=>this.props.handleCancel()}>
                  <Icon name='cancel' size={'large'} /> Cancel
                </Button>
              </div><br/>
            </Form>
          </Container>
      </>
      
    )
  }

}

export default withRouter(Login)