import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import Page from '_/components/Page'

class AuthPage extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render (): JSX.Element {
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>

          </ScrollView>
        </View>
      </Page>
    )
  }

}

export default AuthPage
