import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Navigator from "./src/navigation";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Analytics } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      // TO CREATE USER IN THE DB UPON SIGNING UP
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // query the database using Auth user id (sub)
      const userId = authUser.attributes.sub;
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );

      // if there is no users in db, create
      if (userData.data.getUser === null) {
        const newUser = {
          id: userId,
          name: "Mock Name",
          status: "Disponible",
          image:
            "https://raw.githubusercontent.com/Rmarieta/ChatAppReactNative/backend/assets/users/dummy_user.png",
        };

        const res = await API.graphql(
          graphqlOperation(createUser, {
            input: newUser,
          })
        );
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({});
