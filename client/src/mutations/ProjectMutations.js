import { gql } from '@apollo/client'

const ADD_POJECT = gql`
   mutation AddProject($name:String!, $description:String!,$status:ProjectStatus!,$clientId:ID!){
        addProject(name:$name, description:$description, status:$status, clientId:$clientId){
            id
            name
            description
            status
            client{
                name
                email
                phone
                id
            }
        }
   }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!){
     deleteProject(id:$id){
        id
     }
  }
`;





export { ADD_POJECT, DELETE_PROJECT}