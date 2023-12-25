import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/UserService';
import { toast } from 'react-toastify';


const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [FirstName,setFirstName]=useState("");
  const [job,setJob]=useState("");
  const [dataUserDelete,setDataUserDelete]=useState([])

  const {item,handleDeleteTableFromModal}=props
  const handleEditUser =(user) =>{
    console.log(user)
    setDataUserDelete(user)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditUser(item);
  }

  const handleDeleteUser = async() =>{
        let res = await deleteUser(dataUserDelete.id);
        console.log(">>res: ",res)
        if(res && +res.statusCode === 204){
            handleDeleteTableFromModal(dataUserDelete)
            handleClose();
            let string ='Del id='+String(dataUserDelete.id)
            toast.success(string)
        }
  }
  useEffect(()=>{
    if(show){
        setFirstName(dataUserDelete.first_name)
    }
  },[dataUserDelete])
  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-danger'>
        Delete</Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form >
            Are You Sure To Delete User
        </form>
        <br/>
        <b>Name = {FirstName}</b>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleDeleteUser() }>Confirm</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;