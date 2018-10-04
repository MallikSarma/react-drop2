import update from "react/lib/update";
const notificationReducer = (state = {}, action) =>{
	const actionsMap = {
		ADD_NOTIFICATION : (input, actionData)=>
			update(input, {
					$set: actionData.payload.notification
			}),
		REMOVE_NOTIFICATION: ()=>{
			return {};
		}
	};
	const handler = actionsMap[action.type];

  return handler ? handler(state, action) : state;
};

export default notificationReducer;