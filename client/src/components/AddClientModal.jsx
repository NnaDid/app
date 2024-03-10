import React, { useState} from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/ClientMutations'
import { GET_CLIENTS } from '../queries/ClientQueries'

const AddClientModal = () => {
    const [name, setName]   = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [ addClient ] = useMutation(ADD_CLIENT,{
        variables: {name, email, phone },
        refetchQueries:[{query:GET_CLIENTS}],
    });

    const onsubmit = (e) => {
            e.preventDefault();
            if(name === "" || email === "" || phone ===""){
                return alert("All fieds are required")
            }else{
                addClient( name, email, phone);
                setEmail("");
                setPhone("");
                setName("");
            }

    };
  return (
    <> 
            <button type="button" 
                    className="btn btn-primary btn-sm" 
                    data-bs-toggle="modal" 
                    data-bs-target="#AddClientModal">
              <FaUserPlus/> Add Client
            </button>

            <div className="modal fade" id="AddClientModal"  aria-labelledby="AddClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="AddClientModalLabel">Modal title</h1>
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
                          <label htmlFor="email" className='form-label'>Email</label>
                          <input 
                              type="email"
                              className='form-control'
                              id ="email"
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="phone" className='form-label'>Phone</label>
                          <input 
                              type="tel"
                              className='form-control'
                              id ="phone"
                              value={phone}
                              onChange={(e)=>setPhone(e.target.value)}
                          />
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

export default AddClientModal