import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../services/UserService';
import { toast } from 'react-toastify';


const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [FirstName,setFirstName]=useState("");
  const [LastName,setLastName]=useState("");
  const [job,setJob]=useState("");
  const [dataUserEdit,setDataUserEdit]=useState([])

  const {item,handleUpdateTable,handleUpdateTableFromModal}=props
  const handleEditUser =(user) =>{
    console.log(user)
    setDataUserEdit(user)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditUser(item);
  }

  const handleEditUserInfo = async() =>{
        let res = await putUpdateUser(FirstName,job);
        if(res && res.createdAt){
            handleUpdateTableFromModal({
                first_name:FirstName,
                id:dataUserEdit.id
            })
            console.log(">>id: ",dataUserEdit.id)
            handleClose();
            toast.success("An User Updated")

        }
  }
  useEffect(()=>{
    if(show){
        setFirstName(dataUserEdit.first_name)
    }
  },[dataUserEdit])
  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-warning mx-3'
      >
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" 
            className="form-control"
            value={FirstName}
            onChange={(event) => setFirstName(event.target.value)}
            />
        </div>

        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text"
            className="form-control"
            value={LastName}
            onChange={(event) => setLastName(event.target.value)}
             />
        </div>

        <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label">Job</label>
            <input type="text"
            className="form-control"
            value={job}
            onChange={(event) => setJob(event.target.value)}
            />
        </div>

        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>

        </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleEditUserInfo() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;