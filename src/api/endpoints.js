import { infoConnectUser, infoConnectPass } from 'react-native-dotenv'

export const aucklandTrafficConditions = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/?wsdl`
export const aucklandHeaders = {
  username: infoConnectUser,
  password: infoConnectPass
}
