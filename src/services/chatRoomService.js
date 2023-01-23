import { API, graphqlOperation, Auth } from "aws-amplify";

export const getCommonChatRoomWithUserId = async (userId) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // get all chatrooms of user1
  const res = await API.graphql(
    graphqlOperation(reducedListChatRooms, { id: authUser.attributes.sub })
  );

  const myChatRooms = res.data?.getUser?.ChatRooms?.items || [];

  // check those with user2
  const rightChatRooms = myChatRooms.find((room) => {
    return room.chatRoom.users.items.some(
      (userItem) => userItem.user.id === userId
    );
  });

  return rightChatRooms;
};

export const reducedListChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
