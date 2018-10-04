import React from "react";
import Registration from "routes/Registration/components/Registration";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import {handlePinAuthenticateSuccess,
		getGoodData} from "routes/Registration/modules/registration";

import {PIN_AUTHENTICATE_SUCCESS} from "routes/Registration/modules/actionConstants";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);


describe("Registration Component", () => {
	afterEach(() => {
		nock.cleanAll();
	});

	it("should render", () => {
		const wrapper = shallow(<Registration getAsyncTokens={function(){}} getAsyncPageDetails={function(){}}  />);
		expect(wrapper.length).toBe(1);
	});
	it("should dispatch getGoodDataSuccess action after executing getGoodData action", () => {
		// nock("http://example.com")
		// .get('/list')
		// .reply(200, { myData: 'long_string'} )

		const expectedActions = [
			{ type: "GOOD_DATA_START" },
			{ type: "GOOD_DATA_SUCCESS", payload: { myData: "long_string"} }
		];
		const store = mockStore({
			myData: "" ,
		});
		// console.log(store.getActions())
		// console.log(store)

		return store.dispatch(getGoodData())
			.then(() => {
				// console.log('a')
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it("handlePinAuthenticateSuccess reducer should handle asyncAuthenticatePin action", () => {
		const pinAuthenticateResponse = "success";
		const expectedObject = {pinAuthenticateResponse:pinAuthenticateResponse};
		expect(
			handlePinAuthenticateSuccess({}, {type:PIN_AUTHENTICATE_SUCCESS, payload: {pinAuthenticateResponse}} )
		).toEqual(expectedObject);
	});


});