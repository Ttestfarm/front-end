import {useState} from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import Swal from 'sweetalert2';
//import {useDispatch} from 'react-redux';
//import {useCookies} from 'react-cookie';
import axios from 'axios';

const Login = () => {
    const formStyle = {width:'500px', margin:'20px auto', border:'1px solid lightgray', padding:'30px', borderRadius:'7px'}
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
//    const [cookie, setCookie] = useCookies(['refreshToken'])
//    const dispatch = useDispatch();

    const submit = (e) => {
    }

    return (
        <Form style={formStyle}>
            <h4 style={{textAlign:'center'}}>로그인</h4><br/>
            <FormGroup row>
                <Label for="id" sm={3}>아이디</Label>
                <Col sm={9}>
                    <Input type="text" name="id" id="id" onChange={(e)=>setId(e.target.value)} value={id}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="password" sm={3}>패스워드</Label>
                <Col sm={9}>
                    <Input type="text" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={12}>
                <Button color="primary" style={{width:"100%"}} onClick={submit}>로그인</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default Login;