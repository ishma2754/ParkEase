import {configureStore} from "@reduxjs/toolkit"
import parkingReducer from './features/bookings/parkingSlice'

const store = configureStore({
  reducer: {
    parking: parkingReducer
  }
})

export default store;