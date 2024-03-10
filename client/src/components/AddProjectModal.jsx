import React, { useState} from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client' 
import { GET_PROJECTS } from '../queries/ProjectQueries'
import { GET_CLIENTS } from '../queries/ClientQueries'
import { ADD_POJECT } from '../mutations/ProjectMutations'

const AddProjectModal = () => {
    const [name, setName]               = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId]       = useState("");
    const [status, setStatus]           = useState("new");

    const [ addProject ] = useMutation(ADD_POJECT,{
        variables: {name, description, status, clientId },
        // refetchQueries:[{query:GET_PROJECTS}],
        update(cache, {data:{ addProject }}){
            const { projects } = cache.readQuery( { query: GET_PROJECTS});
            cache.writeQuery({
                query: GET_PROJECTS,
                data:{ projects:[...projects, addProject] }
            });
        },
    });


    // Get Clients
    const { loading, error, data } = useQuery( GET_CLIENTS )

    const onsubmit = (e) => {
            e.preventDefault();
            if(name === "" || description === "" || status ===""){
                return alert("All fieds are required")
            }else{
                addProject( name, description, status, clientId  );
                setDescription("");
                setStatus("new");
                setName("");
                setClientId("");
            }

    };

    if(loading) return null;
    if( error ) return 'something went wrong';

  return (
    <> 
        {
            !loading && !error && (
                <>
                 <button type="button" 
                    className="btn btn-primary btn-sm" 
                    data-bs-toggle="modal" 
                    data-bs-target="#AddProjectModal">
              <FaList/> New Project
            </button>

            <div className="modal fade" id="AddProjectModal"  aria-labelledby="AddProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="AddProjectModalLabel">New Project</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={onsubmit}>
                      <div className="mb-3">
                          <label htmlFor="name" className='form-label'>Name</label>
                          <input 
                              type="text"
                              className='form-control'
                              id ="name"
                              value={name}
                              onChange={(e)=>setName(e.target.value)}
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="description" className='form-label'>Description</label>
                          <textarea  
                              className='form-control'
                              id ="desciption"
                              value={description}
                              onChange={(e)=>setDescription(e.target.value)}></textarea>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="status" className='form-label'>Status</label>
                           <select 
                                   id="status" 
                                   className='form-select'
                                   value={status}
                                   onChange={(e)=>setStatus( e.target.value)}
                                   >
                                <option value="new"> Not Started </option>
                                <option value="progress"> In Progress </option>
                                <option value="done"> Done </option>
                           </select>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="clientid" className='form-label'>Client</label>
                           <select 
                                   id="clientid" 
                                   className='form-select'
                                   value={clientId}
                                   onChange={(e)=>setClientId( e.target.value)}
                                   >
                                  <option value=""> Select Client </option> 
                                  { 
                                    data.clients.map( (client) => ( <option key={client.id} value={client.id}>{ client.name }</option> ))
                                  }
                           </select>
                      </div>



                      <button 
                        type="submit"
                        className="btn btn-primary" >
                            Save changes
                        </button>
                      </form>
                </div> 
               
                </div>
            </div>
            </div>
                </>
            )
        }
    </>
  )
}

export default AddProjectModal