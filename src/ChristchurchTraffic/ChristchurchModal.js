import React from 'react'
import { Layout, Button } from 'react-native-ui-kitten'
import Modal from 'react-native-modal'
import { Header, Title, Body, BodyText, BodyTitle } from '../components/ModalComponents'

class ChristchurchModal extends React.Component {
  render () {
    const properties = this.props.modalProps
    console.log(properties)
    return (
      <Modal
        swipeDirection='down'
        onSwipeComplete={this.props.onClose}
        backdropOpacity={0.5}
        isVisible
        style={{ flex: 0, width: '90%', backgroundColor: '#fff' }}
      >
        <Layout>
          <Header>
            <Title>{properties.eventType}</Title>
          </Header>
          <Body>
            <BodyText>{properties.locationArea}</BodyText>
            <BodyText>{properties.eventDescription}</BodyText>
            <BodyTitle>Impact:</BodyTitle>
            <BodyText>{properties.impact}</BodyText>
            <BodyTitle>Restrictions:</BodyTitle>
            <BodyText>{properties.restrictions}</BodyText>
            <BodyTitle>Start Date:</BodyTitle>
            <BodyText>{properties.startDateNice}</BodyText>
            <BodyTitle>End Date:</BodyTitle>
            <BodyText>{properties.endDateNice}</BodyText>
            <BodyTitle>Last updated:</BodyTitle>
            <BodyText>{properties.lastUpdatedNice}</BodyText>
            <BodyTitle>Company:</BodyTitle>
            <BodyText>{properties.companyName}</BodyText>
            <BodyTitle>Tmp:</BodyTitle>
            <BodyText>{properties.tmpNumber}</BodyText>
          </Body>
          <Button style={{ margin: 8 }} onPress={this.props.onClose}>
            Close
          </Button>
        </Layout>
      </Modal>
    )
  }
}

export default ChristchurchModal
