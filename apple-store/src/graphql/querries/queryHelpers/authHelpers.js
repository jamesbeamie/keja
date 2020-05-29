import apolloClient from "../../../utils/ApolloClient";
//get the query
import { GET_DEVICES_QUERY } from "../../graphql/queries/Devices";

const getAllDevices = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_DEVICES_QUERY,
      },
      true
    );
    return data.allDevices;
  } catch (error) {
    const { data } = await client.query({
      query: GET_DEVICES_QUERY,
    });
    return data.allDevices;
  }
};

export { getAllDevices };
