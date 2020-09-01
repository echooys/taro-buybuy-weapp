import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { CommonEventFunction, View } from '@tarojs/components'
import Transition from '_/components/Transition'
import { mergeStyle } from '_/utils/utils'
import './index.less'

export interface OverlayProps {

  className?: string

  customStyle?: string | CSSProperties
  /**
   * 控制是否出现在页面上
   * @default false
   */
  isOpened: boolean

  /**
   * z-index 层级
   * @default 1
   */
  zIndex: number | string

  /**
   * 动画世界
   * @default 300
   */
  duration: number
  /**
   * 元素被点击触发的事件
   */
  onClick: CommonEventFunction
}

export interface OverlayState {
  /**
   * 控制是否出现在页面上
   */
  _isOpened: boolean
}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {
  public static defaultProps: OverlayProps
  public static propTypes: InferProps<OverlayProps>

  /**
   * 遮罩层点击事件
   * @param e
   */
  handleClick (e: any) {
    e.stopPropagation()
    this.props.onClick && this.props.onClick(e)
  }

  render () {
    const { isOpened, zIndex, duration, className, customStyle, children } = this.props
    return (
      <Transition
        isOpened={isOpened}
        duration={duration}
        customStyle={mergeStyle({ zIndex: zIndex }, customStyle || {})}
      >
        <View
          className={classNames('am-overlay', className)}
          onClick={this.handleClick.bind(this)}
        >
          {children}
        </View>
      </Transition>
    )
  }
}
Overlay.defaultProps = {
  isOpened: false,
  zIndex: 1,
  duration: 300,
  onClick: () => {}
}

Overlay.propTypes = {
  isOpened: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.number,
  onClick: PropTypes.func
}
