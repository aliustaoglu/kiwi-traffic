import { infoConnectUser, infoConnectPass } from 'react-native-dotenv'

export const aucklandTrafficConditions = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficConditions2/REST/FeedService/?wsdl`
export const aucklandSigns = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/VariableMessageSigns2/REST/FeedService/?wsdl`
export const aucklandCameras = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TrafficCameras2/REST/FeedService/?wsdl`
export const aucklandHeaders = {
  username: infoConnectUser,
  password: infoConnectPass
}

export const treisFeed = `https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TREIS/REST/FeedService/`
export const treisHeaders = aucklandHeaders

export const markerCollection = `https://www.journeys.nzta.govt.nz/assets/tas/markercollection.json`
export const journeyCollection = `https://www.journeys.nzta.govt.nz/assets/tas/journeycollection.json`
export const regionCollection = `https://www.journeys.nzta.govt.nz/assets/tas/regions.json`
export const cameraCollection = `https://www.journeys.nzta.govt.nz/assets/tas/cameras.json`

export const canterburyRoadworks = `https://journeys.nzta.govt.nz/assets/roadworks/canterbury-roadworks-markers.json`
export const canterburyClosure = `https://journeys.nzta.govt.nz/assets/roadworks/canterbury-closure-markers.json`
export const canterburyXRoadworks = `https://journeys.nzta.govt.nz/assets/roadworks/canterbury-roadworks-extents.json`
export const canterburyXClosure = `https://journeys.nzta.govt.nz/assets/roadworks/canterbury-closure-extents.json`

