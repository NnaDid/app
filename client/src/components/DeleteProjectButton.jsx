import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { GET_PROJECTS } from '../queries/ProjectQueries'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutations/ProjectMutations'




const DeleteProjectButton = ( { projectId }) => {
  const navigage = useNavigate();

  const [deleteProject ] = useMutation(DELETE_PROJECT,{
    variables: { id: projectId},
    onCompleted: () => navigage('/'),
    refetchQueries:[ { query: GET_PROJECTS}]
  })

  return (
    <div className="d-flex mt-5 ms-auto">
        <button className="btn btn-danger m-2" onClick={deleteProject}>
            <FaTrash /> Delet Project
        </button>
    </div>
  )
}

export default DeleteProjectButton