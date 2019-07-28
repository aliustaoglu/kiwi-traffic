import React from 'react'
import { Layout, Text, Button } from 'react-native-ui-kitten'
import Modal from 'react-native-modal'
import { Header, Title } from '../components/ModalComponents'
import styled from 'styled-components/native'

const Body = styled(Layout)`
  padding: 8px;
`

const BodyText = styled(Text)`
  margin-bottom: 8px;
`

const BodyTitle = styled(Text)`
  font-weight: 600;
  margin-bottom: 4px;
  text-decoration: underline;
`

class TreisModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const properties = this.props.modalProps.properties
    console.log(JSON.stringify(this.props.modalProps.properties, 4))
    return (
      <Modal swipeDirection='down' onSwipeComplete={this.props.onClose} backdropOpacity={0.5} isVisible style={{ flex: 0, width: '90%', backgroundColor: '#fff' }}>
        <Layout>
          <Header>
            <Title>
              {properties.eventType} : {properties.impact}
            </Title>
          </Header>
          <Body>
            <BodyText>{properties.locationArea}</BodyText>
            <BodyText>{properties.eventDescription}</BodyText>
            <BodyText>{properties.eventComments}</BodyText>
            <BodyTitle>Scheduled Time:</BodyTitle>
            <BodyText>{properties.startDateNice}</BodyText>
            <BodyTitle>Detour route:</BodyTitle>
            <BodyText>{properties.alternativeRoute}</BodyText>
            <BodyTitle>Update received:</BodyTitle>
            <BodyText>{properties.eventModifiedNice}</BodyText>
            <BodyTitle>Expected resolution:</BodyTitle>
            <BodyText>{properties.expectedResolution}</BodyText>
          </Body>
          <Button style={{ margin: 8 }} onPress={this.props.onClose}>
            Close
          </Button>
        </Layout>
      </Modal>
    )
  }
}

export default TreisModal
