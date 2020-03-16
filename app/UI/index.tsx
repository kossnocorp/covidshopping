import { RouterContext, useRouter } from '#app/router'
import { Wrapper } from '#GECK/UI/Layout'
import { El } from '#GECK/UI/Spacing'
import { Size } from '#GECK/UI/types'
import { h } from 'preact'
import { useContext, useEffect } from 'preact/hooks'
import HomePage from './HomePage'
import './style'

export default function UI({ initialURL }: { initialURL: string }) {
  const router = useRouter(initialURL)

  return (
    <RouterContext.Provider value={router}>
      <Wrapper>
        <El size={Size.XLarge} padded fullWidth>
          <Content />
        </El>
      </Wrapper>
    </RouterContext.Provider>
  )
}

function Content() {
  const { location } = useContext(RouterContext)

  useEffect(() => {
    document.title = location.meta.title
  }, [])

  switch (location.name) {
    case 'home':
      return <HomePage />

    case '404':
    default:
      return <div>404</div>
  }
}
