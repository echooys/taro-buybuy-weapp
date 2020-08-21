import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Text, View } from '@tarojs/components'

import './index.less'

interface LoadingMoreProps {
  loading: boolean
  finished: boolean
}

interface LoadingMoreState {
}

class LoadingMore extends React.Component<LoadingMoreProps, LoadingMoreState> {
  public static defaultProps: LoadingMoreProps
  public static propTypes: InferProps<LoadingMoreProps>

  render (): JSX.Element {
    const { loading, finished } = this.props
    return (
      <View className='loading-more'>
        <Text className='loading-more--text'>
          {finished ? (loading ? '努力加载中...' : '滑动加载更多哦！') : '没有更多了！'}
        </Text>
      </View>
    )
  }

}

LoadingMore.defaultProps = {
  loading: false,
  finished: true
}

LoadingMore.propTypes = {
  loading: PropTypes.bool,
  finished: PropTypes.bool
}

export default LoadingMore
