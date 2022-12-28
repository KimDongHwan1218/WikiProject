import React, { Component } from 'react';
import { redirect } from 'react-router-dom';
export default class LoginComponent extends Component {
    render(){
        return redirect("/search/:위키홈");
    }
}