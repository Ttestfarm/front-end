import { Table, Input, Button,Label } from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {useState, useRef} from 'react';
import axios from 'axios';

const WriteForm = () => {
    const [board, setBoard] = useState({subject:'',content:'',writer:''});
    const [files, setFiles] = useState([]);
    const imgBoxRef = useRef();
    const navigate = useNavigate();

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBoard({...board, [name]:value});
    }

    const fileChange = (e) => {
        if(e.target.files.length>0) {
            setFiles([...files,e.target.files[0]]);
        }
        
        // const imageSrc = URL.createObjectURL(e.target.files[0]);
        // imgBoxRef.current.src = imageSrc;
    }

    const submit = (e) => {
        const formData = new FormData();
        formData.append("subject", board.subject);
        formData.append("content", board.content);
        formData.append("writer", board.writer);
        // formData.append("file", files);
        for(let file of files) {
            formData.append("file", file);
        }
        console.log(formData)
        axios.post('http://localhost:8090/boardwrite', formData)
        .then(res=> {
            console.log(res);
            let boardNum = res.data;
            navigate(`/detailform/${boardNum}`)
        })
        .catch(err=> {
            console.log(err)
        })
    }

    return (
        <>
            <h5 style={{textAlign:'center', margin:'20px auto'}}>게시판글등록</h5>
            <div style={{margin:'0 auto',width:'600px', border:'1px solid lightgray', borderRadius:'7px', padding:'10px'}}>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td><Label for="writer">글쓴이</Label></td>
                            <td><Input type="text" name="writer" onChange={change}
                                id="writer" required="required" value={board.writer}/></td>
                        </tr>
                        <tr>
                            <td><Label for="subject">제 목</Label></td>
                            <td><Input name="subject" type="text" onChange={change}
                                id="subject" required="required" value={board.subject}/></td>
                        </tr>
                        <tr>
                            <td><Label for="content">내 용</Label></td>
                            <td><Input type='textarea' id="content" name="content" onChange={change}
                                cols="40" rows="15" required="required" value={board.content}/></td>
                        </tr>
                        <tr>
                            <td><Label for="file"> 이미지 파일 첨부 </Label></td>
                            <td>
                                <img src="/plus.png"  width="100px" height="100px" alt='' ref={imgBoxRef} 
                                    onClick={()=>document.getElementById("file").click()}/><br/><br/>
                                <Input name="file" type="file" id="file" accept="image/*" onChange={fileChange} hidden/>
                                {
                                    files.length!==0 &&
                                    files.map((file, index)=>
                                        <span key={index}>
                                        <img src={URL.createObjectURL(file)}  width="100px" height="100px" alt='' style={{marginRight:"10px"}}/>
                                            {(index+1)%3===0? <><br/><br/></>:''}
                                        </span>
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Button color='primary' onClick={submit}>등록</Button>&nbsp;&nbsp;
                                <Button color='primary'>다시쓰기</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}


export default WriteForm;