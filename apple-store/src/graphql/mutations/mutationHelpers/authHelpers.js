import { ADD_RESOURCE_MUTATION } from "../../../graphql/mutations/AddResourceToRoom";
import { SIGNUP_MUTATION } from "../signup";
import apolloClient from "../../../utils/ApolloClient";

// const addResourceMutation = async (name, client = apolloClient) => {
//   await client.mutate({
//     mutation: ADD_RESOURCE_MUTATION,
//     name: "addResourceMutation",
//     variables: { name },
//     // write and read from cache
//     update: async (proxy, { data: { createResource } }) => {
//       const cachedResources = proxy.readQuery({
//         query: GET_RESOURCES_QUERY,
//         variables: {
//           page: 1,
//           perPage: 5,
//         },
//       });
//       const resourceList = cachedResources.allResources.resources;
//       cachedResources.allResources.resources = [
//         ...resourceList,
//         createResource.resource,
//       ];

//       proxy.writeQuery({
//         query: GET_RESOURCES_QUERY,
//         variables: {
//           page: 1,
//           perPage: 5,
//         },
//         data: cachedResources,
//       });
//     },
//   });
// };

const userSignUpMutation = async (name, client = { apolloClient }) => {
  await client.mutate({
    mutation: SIGNUP_MUTATION,
    name: "createUser",
  });
};

export {
  // addResourceMutation,
  userSignUpMutation,
};
