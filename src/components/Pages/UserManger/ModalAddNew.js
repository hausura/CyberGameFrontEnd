import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
  const {handleUpdateTable} = props;
  const [show, setShow] = useState(false);
  const [FirstName,setFirstName]=useState("");
  const [LastName,setLastName]=useState("");
  const [job,setJob]=useState("");



  const handleSaveUser = async()=>{
    let res = await postCreateUser(FirstName,job);

    console.log(">>>> check res: ",res)
    if(res&& res.id){
        handleClose();
        setFirstName('');
        setLastName('');
        setJob('');
        toast.success("An User Added")
        handleUpdateTable({first_name: FirstName, id: res.id});
    }
    else{
        alert('Error while saving the user');
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className='btn btn-success'>
      <i className='fa-solid fa-circle-plus'/>
            Add User
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">First Name</label>
            <input type="text" 
            class="form-control"
            value={FirstName}
            onChange={(event) => setFirstName(event.target.value)}
            />
        </div>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Last Name</label>
            <input type="text"
            class="form-control"
            value={LastName}
            onChange={(event) => setLastName(event.target.value)}
             />
        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Job</label>
            <input type="text"
            class="form-control"
            value={job}
            onChange={(event) => setJob(event.target.value)}
            />
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>

        </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" class="btn btn-primary" onClick={() => handleSaveUser() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;