import { ContentWrapper } from '#GECK/UI/Layout'
import { V } from '#GECK/UI/Spacing'
import { Header, Text } from '#GECK/UI/Text'
import { Size } from '#GECK/UI/types'
import { h } from 'preact'

export default function HomePage() {
  return (
    <ContentWrapper size={Size.Large} aligned>
      <V>
        <Header>Hello World!</Header>
        <Text>Hello World!</Text>
      </V>
    </ContentWrapper>
  )
}
