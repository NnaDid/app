
import { FaTrash, FaEye } from "react-icons/fa";
const ProjectCard = ( { project }) => {
    const statusColor = ( status )=>{
        switch ( status ){
            case 'Done':  
                 return <label className="text-success"> { status }</label>
             break;
            case 'In Progress':  
                 return <label className="text-warning"> { status }</label>
             break;
            case 'Not Started':  
                 return <label className="text-primary"> { status }</label>
             break;
        }
    }
  return (
    <div className="col-md-3">
         <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title"> {project.name}</h5>
                    <a href={`/projects/${project.id}`} className="btn btn-light btn-sm"> <FaEye /> </a>
                </div>
                <div className="d-flex justify-content-between align-items-center my-2">
                        <p className="small"> Status : <strong>{ statusColor(project.status) }</strong></p>
                        <a href={`/projects/${project.id}`} className="btn btn-danger btn-sm"> <FaTrash /> </a>
                </div>

            </div>
         </div>
    </div>
  )
}

export default ProjectCard