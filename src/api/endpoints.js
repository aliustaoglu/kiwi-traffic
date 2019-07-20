import { infoConnectUser, infoConnectPass } from 'react-native-dotenv'

export const aucklandTrafficConditions = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/?wsdl`
export const aucklandSigns = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/VariableMessageSigns2/REST/FeedService/?wsdl`
export const aucklandCameras = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/?wsdl`
export const aucklandHeaders = {
  username: infoConnectUser,
  password: infoConnectPass
}
