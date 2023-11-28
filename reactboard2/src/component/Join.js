import {useState} from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import Swal from 'sweetalert2';
import axios from 'axios';

const Join = () => {
    const formStyle = {width:'500px', margin:'20px auto', border:'1px solid lightgray', padding:'30px', borderRadius:'7px'}
    const [user, setUser] = useState({id:'',name:'', password:'',email:'',address:''});

    const changeInput = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const submit = (e) => {
 
    }

    return (
        <Form style={formStyle}>
            <h4 style={{textAlign:'center'}}>회원가입</h4><br/>
            <FormGroup row>
                <Label for="id" sm={3}>아이디</Label>
                <Col sm={9}>
                    <Input type="text" name="id" id="id" onChange={changeInput} value={user.id}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={3}>이름</Label>
                <Col sm={9}>
                    <Input type="text" name="name" id="name" onChange={changeInput} value={user.name}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="password" sm={3}>비밀번호</Label>
                <Col sm={9}>
                    <Input type="text" name="password" id="password" onChange={changeInput} value={user.password}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="email" sm={3}>이메일</Label>
                <Col sm={9}>
                    <Input type="text" name="email" id="email" onChange={changeInput} value={user.email}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="address" sm={3}>주소</Label>
                <Col sm={9}>
                <Input type="text" name="address" id="address" onChange={changeInput} value={user.address}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={12}>
                <Button color="primary" style={{width:"100%"}} onClick={submit}>회원가입</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default Join;