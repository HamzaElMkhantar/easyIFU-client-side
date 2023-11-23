import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../../components/header/header.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { deleteProjectAction, getAllProjectsAction, startProjectAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

import VisibilityIcon from '@mui/icons-material/Visibility';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: "600px",
  width:"98%" ,
  bgcolor: 'background.paper',
  border: '1px solid lightGray',
  boxShadow: 4,
  p: 4,
  borderRadius: '3px'
};

const Project = () => {

  // side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  // -- component logic --

  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [allProjects, setAllProjects] = useState([])

  const {startProject, getAllProjects, deleteProject} = useSelector(state => state)
  const {getAllProjectsRequest, getAllProjectsSuccess, getAllProjectsFail, projects} = getAllProjects
  const {startProjectRequest, startProjectSuccess, startProjectFail, projectId} = startProject
  const {deleteProjectRequest, deleteProjectSuccess, deleteProjectFail} = deleteProject

  // get all projects
  useEffect(() => {
    dispatch(getAllProjectsAction(token))
  }, [])

  useEffect(() => {
    if(deleteProjectSuccess){
      dispatch(getAllProjectsAction(token))
    }
  }, [deleteProjectSuccess])


  useEffect(() => {
    if(getAllProjectsSuccess){
      setAllProjects(projects)
    }

    if(getAllProjectsFail){
      // toast.warning(`${getAllProjectsFail.message}`)
      setAllProjects([])
    }

    if(deleteProjectFail){
      toast.warning(`${deleteProjectFail.message}`)
    }
  }, [getAllProjectsSuccess, getAllProjectsFail, deleteProjectFail])



  // ----

  // toggle form 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const [formData, setFormData] = useState({
    companyId: decodedToken && decodedToken.userInfo && decodedToken.userInfo.companyId,
    projectName: '',
    projectDescription: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.projectName == '' || formData.projectDescription == ''){
      toast.warning("Fields are Empty !")
    }else{
      dispatch(startProjectAction(formData, token))
    }
  }

  const handleDelete = (projectId) => {
    dispatch(deleteProjectAction(projectId, token))
  }

  useEffect(() => {
    if(startProjectSuccess){
      navigate(`/dashboard/create-project/step1/${projectId}`)
    }
    if(startProjectFail){
      toast.error("Fields are Empty !")
    }
  }, [ startProjectSuccess, startProjectFail])
  
  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />

      <main className='' style={{paddingTop:'0px', width:'100%'}}>
        {/* Dashboard header  */}
        <div  style={{ borderBottom:'1px solid lightGray'}} id="page-content-wrapper">
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='container-dashboard'>
            <span href="#menu-toggle" id="menu-toggle" onClick={toggleSidebar}>
              &#9776;
            </span>
            <div >
              <Avatar
              sx={{ width: 40, height: 40 }}
                  style={{backgroundColor:'black'}}>
                  
              </Avatar>
            </div>
          </div>
        </div>

        {/* Dashboard  content   */}
        <section className='container' style={{marginTop:'20px'}}>

          {/* modal */}
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 style={{color:'#08408B', textAlign:'center'}}>
                  Project Information
              </h2>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                        <label>1- Project Name:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>2- Project Description:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>3- Labels Count:</label>
                        <input
                        type="number"
                        className="form-control"
                        name="labelsCount"
                        value={formData.labelsCount}
                        onChange={handleInputChange}
                        />
                    </div> */}
                    {!startProjectRequest 
                      ? <div style={{display:'flex', justifyContent:'space-between'}}>
                        <button style={{marginTop:'20px', padding:'5px 20px', fontWeight:'600', fontSize:'18px', borderRadius:'5px', backgroundColor:'#011d41', color:'#fff'}}>Start Creating</button>
                        <button
                          onClick={handleClose}
                          style={{marginTop:'20px', padding:'5px 20px', fontWeight:'600', fontSize:'18px', borderRadius:'5px', backgroundColor:'#1753A2', color:'#fff'}}>Close</button>
                      </div> 
                      : <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                          <RotatingLines
                            strokeColor="#011d41"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible={true}
                          /> 
                      </div>
                    }
                </form>
              </Typography>
            </Box>
          </Modal>

          {/* <Link to='/dashboard/create-project/step1'> */}
            <button onClick={handleOpen}
                    style={{
                      padding: "8px 20px",
                      backgroundColor:"#9a3b3a",
                      borderRadius:'3px',
                      color: "#ecf0f3",
                      fontWeight:'700'
                    }}>
                New Project</button>
          {/* </Link> */}
          <div>
            <table style={{backgroundColor:'#fff'}} className="table table-hover my-1">
              <thead style={{backgroundColor:'#075670', textAlign:'center'}} className="thead-dark">
                  <tr style={{color:'#fff'}}>
                  <th scope="col">#</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Manage</th>
                  <th scope="col">Delete</th>
                  </tr>
              </thead>
              <tbody style={{ textAlign:'center'}}>
                {allProjects &&
                  allProjects.map((item, index) => {
                    return (
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{item.projectName}</td>
                        <td>{item.projectDescription}</td>
                        <td>
                          {item.projectStep < 9 
                          ? <Link to={`/dashboard/create-project/step${item.projectStep}/${item._id}`}
                            style={{backgroundColor:'#0C458F', 
                              color:"#fff", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              Continue
                          </Link>
                          : <Link to={`/dashboard/project-information/${item._id}`}
                            style={{backgroundColor:'#0C458F', 
                              color:"#fff", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              <VisibilityIcon style={{paddingBottom:'3px'}} />
                          </Link>}
                        </td>
                        <td><button style={{backgroundColor:'#E97472', borderRadius:'5px'}} onClick={() => handleDelete(item._id)}>delete</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
              {(getAllProjectsRequest || deleteProjectRequest) && 
                <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                  <RotatingLines
                    strokeColor="#011d41"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                  /> 
                </div>
              }
              {allProjects.length < 1 && <h6 style={{textAlign:'center', marginTop:'10px'}}>doesn't exist any project</h6>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Project