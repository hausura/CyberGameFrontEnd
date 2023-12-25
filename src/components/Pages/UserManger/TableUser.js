import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import {fetchAllUser} from '../../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { CSVLink, CSVDownload } from "react-csv";
import '../../../scss/Table.scss'


const TableUsers=(props)=>{
  const[listUsers,setListUsers]=useState([])
  // const [itemOffset, setItemOffset] = useState(0);
  const [totalPages,setTotalPages]= useState(0);
  const [originList,setOriginList]=useState([]);
  const [findUserName,setFindUserName]=useState("");
  const [sortBy,setSortBy]=useState('asc');
  const [totalUser,setTotalUsers]=useState([])
  const [sortField,setSortField]=useState("id");

  useEffect(()=>{
    getUsers(1);
  },[])
  const _ = require('lodash');


  const handleUpdateTable = (user) =>{
    setListUsers([user, ...listUsers])
  }
  const handleUpdateTableFromModal = (user) =>{
    let cloneListIsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id)
    cloneListIsers[index].first_name=user.first_name
    setListUsers(cloneListIsers)
    console.log(">>edit index",index)
    console.log("Check clone>> :",cloneListIsers)
  }
  const handleDeleteTableFromModal = (user) =>{
    let cloneListIsers = _.cloneDeep(listUsers);
    cloneListIsers =cloneListIsers.filter(item =>item.id !== user.id)
    setListUsers(cloneListIsers)
    console.log("Deleted clone>> :",cloneListIsers)
  }
  const handleSort= (sortBy,sortField)=>{
    setSortBy(sortBy);
    setSortField(sortField);

    const _ = require('lodash');
    let cloneListIsers = _.cloneDeep(listUsers);
    cloneListIsers= _.orderBy( cloneListIsers,[sortField],[sortBy])
    setListUsers(cloneListIsers)
  }

  const handleSearch = _.debounce((event) =>{
    let term = event.target.value.toLowerCase();
    console.log("check term: ",term)

    if(term){
      const _ = require('lodash');
      let cloneListIsers = _.cloneDeep(originList);
      cloneListIsers =cloneListIsers.filter(item =>item.first_name.toLowerCase().includes(term))
      setListUsers(cloneListIsers);
    }
    else{
      getUsers(1);
    }
  },2000)



  const getUsers= async(page)=>{
    let res = await fetchAllUser(page);
    if(res && res && res.data){
      setTotalPages(res.total_pages)
      setTotalUsers(res.total)
      setListUsers(res.data)
      setOriginList(res.data)
    }
  }
  // const itemsPerPage=6
  // const endOffset = itemOffset + itemsPerPage;
  // const currentUser = totalUsers.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(totalUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    getUsers(+event.selected +1);
  };  
    return (
        <>
        <div className='col-12 col-sm-4 my-3'>
          <input 
          className='form-control' 
          placeholder='Search by name'
          onChange={(event) => handleSearch(event) }
          />
        </div>
        <div className="d-sm-flex justify-content-between">
            <span >List User:</span>
            <div className='func-button'>
              <label htmlFor='import'  className='btn btn-dark'>
                  <i className='fa-solid fa-file-arrow-up'/>
                  <input id='import' type='file' hidden></input>
                  Import
              </label>
              <CSVLink 
              filename={"myListUser.csv"}
              className="btn btn-primary"
              target="_blank"
              data={listUsers}>
              <i className='fa-solid fa-file-arrow-down'/>
              Export File
              </CSVLink>
              <ModalAddNew
              handleUpdateTable={handleUpdateTable}
              />
            </div>
        </div>
        <div className='customize-table'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                    <div className='sort-header'>                  
                      Id
                      <span>
                        <i 
                        className='fa-solid fa-arrow-up-long'
                        onClick={()=>handleSort("asc","id")}
                        />
                        <i 
                        className='fa-solid fa-arrow-down-long'
                        onClick={()=>handleSort("desc","id")}
                        />
                      </span>
                    </div>
                </th>
                <th className='sort-header'>email</th>
                <th>
                    <div className='sort-header'>                  
                      First Name
                      <span>
                        <i 
                        className='fa-solid fa-arrow-up-long'
                        onClick={()=>handleSort("asc","first_name")}
                        />
                        <i 
                        className='fa-solid fa-arrow-down-long'
                        onClick={()=>handleSort("desc","first_name")}
                        />
                      </span>
                    </div>
                </th>
                <th className='sort-header'>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length>0 &&
              listUsers.map((item,index) =>{
                return(
                  <tr key={`user${index}`}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        <ModalEdit 
                        item={item}
                        handleUpdateTable={handleUpdateTable}
                        handleUpdateTableFromModal={handleUpdateTableFromModal}
                        />
                        <ModalDelete                      
                        item={item}
                        handleUpdateTable={handleUpdateTable}
                        handleDeleteTableFromModal={handleDeleteTableFromModal}
                        />
                      </td>
                </tr>
                )
              })
              }
            </tbody>
          </Table>
        </div>
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        />
        </>
      );
    }
export default TableUsers;