const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Prevent duplicate addresses */
      const item = state.addresses.find((address) => address.street === action.payload.street && address.houseNumber === action.payload.houseNumber)
      if (!item) {
        return { ...state, addresses: [...state.addresses, action.payload] }
      } else {
        console.log('duplicate')
      }
    case "address/remove":
      /** TODO: Write a state update which removes an address from the addresses array. */
      return { ...state, addresses: state.addresses.filter((event) => event.id !== action.payload) }
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
