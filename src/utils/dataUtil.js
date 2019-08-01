import { path } from 'ramda'

export const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object
  return otherKeys
}

export const getTrafficData = result => {
  const lastUpdated = result['tns:getTrafficConditionsResponse']['tns:trafficConditions'][0]['tns:lastUpdated']
  let traffic = []
  result['tns:getTrafficConditionsResponse']['tns:trafficConditions'][0]['tns:motorways'].map(motorway => {
    motorway['tns:locations'].map(location => {
      traffic.push({
        congestion: location['tns:congestion'][0],
        direction: location['tns:direction'][0],
        endLat: location['tns:endLat'][0],
        endLon: location['tns:endLon'][0],
        id: location['tns:id'][0],
        inOut: location['tns:inOut'][0],
        name: location['tns:name'][0],
        order: location['tns:order'][0],
        startLat: location['tns:startLat'][0],
        startLon: location['tns:startLon'][0],
        motorway: motorway['tns:name'][0]
      })
    })
  })
  return {
    lastUpdated,
    traffic
  }
}

export const getSignsData = result => {
  const signs = result['tns:getSignsResponse']['tns:sign']
  return signs.map(sign => {
    return {
      id: sign['tns:id'][0],
      identifier: sign['tns:identifier'][0],
      name: sign['tns:name'][0],
      description: sign['tns:description'][0],
      direction: sign['tns:direction'][0],
      message: sign['tns:current-message'][0],
      update: sign['tns:last-update'][0],
      lat: sign['tns:lat'][0],
      lon: sign['tns:lon'][0]
    }
  })
}

export const getCamsData = result => {
  const cams = result['tns:getCamerasResponse']['tns:camera']

  const camsData = cams.map(cam => {
    return {
      congestionLocations: path(['tns:congestionLocations', 0], cam),
      description: path(['tns:description', 0], cam),
      direction: path(['tns:direction', 0], cam),
      group: path(['tns:group', 0], cam),
      id: path(['tns:id', 0], cam),
      imageUrl: path(['tns:imageUrl', 0], cam),
      lat: path(['tns:lat', 0], cam),
      lon: path(['tns:lon', 0], cam),
      name: path(['tns:name', 0], cam),
      offline: path(['tns:offline', 0], cam),
      region: path(['tns:region', 0], cam),
      thumbUrl: path(['tns:thumbUrl', 0], cam),
      underMaintenance: path(['tns:underMaintenance', 0], cam),
      viewUrl: path(['tns:viewUrl', 0], cam)
    }
  })
  return camsData
}

export const getChristchurchRoadworks = result => {
  let roadworks = []
  result.forEach(r => {
    const lat = r.geometry.coordinates[1]
    const lon = r.geometry.coordinates[0]
    const { EventType, LocationArea, EventDescription, Restrictions, StartDateNice, EndDateNice, LastUpdatedNice, CompanyName, TMPNumber } = r.properties
    roadworks.push({
      lat,
      lon,
      eventType: EventType,
      locationArea:LocationArea,
      eventDescription:EventDescription,
      restrictions:Restrictions,
      startDateNice:StartDateNice,
      endDateNice:EndDateNice,
      lastUpdatedNice:LastUpdatedNice,
      companyName:CompanyName,
      tmpNumber:TMPNumber
    })
  })
  return roadworks
}
