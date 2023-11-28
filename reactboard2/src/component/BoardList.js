import { Table, Input, Button, FormGroup, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isSearch, setIsSearch] = useState(false);
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        reqBoardList(1);
    }, [])

    const reqBoardList = (repage) => {
        axios.get(`http://localhost:8090/boardlist/${repage}`)
        .then(res=> {
            console.log(res)
            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;
            setBoards([...list]);
            let btn = [];
            for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
                btn.push(i);
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});
            setIsSearch(false);
        })
        .catch(err=> {
            console.log(err);
        })
    }

    const searchSubmit = () => {
        reqBoardSearch(1);
    }

    const reqBoardSearch = (repage) => {
        if(type==='') {
            alert('검색타입을 입력하세요');
            return;
        }
        if(keyword.trim()==='') {
            alert('키워드를 입력하세요');
            return;
        }

        axios.get(`http://localhost:8090/boardsearch/${repage}/${type}/${keyword}`)
        .then(res=> {
            console.log(res);
            let pageInfo = res.data.pageInfo;
            let list = res.data.boardList;
            setBoards([...list]);
            let btn = [];
            for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
                btn.push(i);
            }
            setPageBtn(btn);
            setPageInfo({...pageInfo});  
            setIsSearch(true);
        })
        .catch(err=> {
            console.log(err);
        });
    }

    const pageChange = (repage) => {
        if(isSearch) reqBoardSearch(repage);
        else reqBoardList(repage);
    }

    const deleteBoard = (e) => {
        let boardNum = e.target.id;
        axios.delete(`http://localhost:8090/boarddelete/${boardNum}`)
        .then(res => {
            // let num = res.data;
            // let reboards = boards.filter(board=> board.num!==num);
            // setBoards([...reboards]);
            pageChange(pageInfo.curPage);
        })
        .catch(err=> {
            console.log(err);
        })
    }

    return (
        <>
            <div style={{ margin: '20px auto', textAlign: 'center', fontSize: '25px' }}>
                게시판글 목록
            </div>
            <br />
            <FormGroup row style={{ width: "600px", textAlign: "center", margin: "0 auto" }}>
                <Col sm={3}>
                    <Input type='select' name="type" onChange={(e)=>setType(e.target.value)}>
                        <option value=''>선택하세요</option>
                        <option value='subject'>제목</option>
                        <option value='writer'>작성자</option>
                        <option value='content'>내용</option>
                    </Input>
                </Col>
                <Col sm={3}>
                    <Input type="text" name="keyword" onChange={(e)=>setKeyword(e.target.value)}/>
                </Col>
                <Col sm={3}>
                    <Button onClick={searchSubmit}>검색</Button>
                </Col>
                <Col sm={3}>
                    <Button tag='a' href="/writeform" color='success'>글쓰기</Button>
                </Col>
            </FormGroup>
            <Table bordered className="table" style={{ margin: "0 auto", width: "900px" }}>
                <thead>
                    <tr key="0">
                        <td>번호</td><td>제목</td><td>작성자</td><td>날짜</td><td>조회수</td><td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {boards.length !== 0 && boards.map(board => {
                        return (
                            <tr key={board.num}>
                                <td><Link to={"/detailform/"+board.num}>{board.num}</Link></td>
                                <td>{board.subject}</td>
                                <td>{board.writer}</td>
                                <td>{board.writedate}</td>
                                <td>{board.viewcount}</td>
                                <td><Button id={board.num} onClick={deleteBoard}>삭제</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table><br/>
            <Pagination style={{ margin: "0 auto", width: "900px",alignItems: "center"}}>
                {pageInfo.curPage===1?
                    <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                    </PaginationItem>:
                    <PaginationItem>
                    {/* <PaginationLink previous href={"/list/"+(pageInfo.curPage-1)} /> */}
                    <PaginationLink previous onClick={()=>pageChange(pageInfo.curPage-1)} />
                </PaginationItem>
                }
                {                   
                    pageBtn.map(item=>{
                        return(
                            <PaginationItem key={item} className={item===pageInfo.curPage? 'active':''}>
                                {/* <PaginationLink href={"/list/"+item}>{item}</PaginationLink> */}
                                <PaginationLink onClick={()=>pageChange(item)}>{item}</PaginationLink>
                            </PaginationItem>                            
                        )
                    })
                }
                {
                    pageInfo.curPage===pageInfo.endPage?
                        <PaginationItem disabled>
                            <PaginationLink next href="#" />
                        </PaginationItem>:
                        <PaginationItem>
                            {/* <PaginationLink next href={"/list/"+(pageInfo.curPage+1)} /> */}
                            <PaginationLink next onClick={()=>pageChange(pageInfo.curPage+1)} />
                        </PaginationItem>
                }
            </Pagination>
        </>
    )
}

export default BoardList;