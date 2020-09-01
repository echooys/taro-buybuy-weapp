import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import {
  Block,
  CommonEvent,
  CommonEventFunction,
  View
} from '@tarojs/components'
import PropTypes, { InferProps } from 'prop-types'
import Overlay from '_/components/Overlay'
import Icon from '_/components/Icon'
import Transition from '_/components/Transition'
import './index.less'

export interface PopupProps {

  className?: string

  customStyle?: string | CSSProperties
  /**
   * 控制是否出现在页面上
   * @default false
   */
  isOpened: boolean

  position?: string

  round?: boolean

  closeIcon?: boolean

  onClose: CommonEventFunction

}

interface PopupState {

}

export default class Popup extends React.Component<PopupProps, PopupState> {
  public static defaultProps: PopupProps
  public static propTypes: InferProps<PopupProps>

  handleClose (e: CommonEvent) {
    e.stopPropagation()
    this.props.onClose && this.props.onClose(e)
  }

  render (): JSX.Element {
    const { isOpened, children, round, position, closeIcon, customStyle, className } = this.props

    const popupClass = classNames('popup', `popup--${position}`, {
      'popup--round': round
    }, className)

    let enterName: string
    let leaveName: string
    switch (position) {
      case 'top':
        enterName = 'slideInDown'
        leaveName = 'slideOutUp'
        break
      case 'right':
        enterName = 'slideInRight'
        leaveName = 'slideOutRight'
        break
      case 'bottom':
        enterName = 'slideInUp'
        leaveName = 'slideOutDown'
        break
      case 'left':
        enterName = 'slideInLeft'
        leaveName = 'slideOutLeft'
        break
      default:
        enterName = 'fadeIn'
        leaveName = 'fadeOut'
    }
    return (
      <Block>
        <Overlay
          isOpened={isOpened}
          zIndex={998}
          onClick={this.handleClose.bind(this)}
        />
        <Transition
          isOpened={isOpened}
          enterName={enterName}
          leaveName={leaveName}
          customStyle={customStyle}
        >
          <View className={popupClass}>
            {children}
            {closeIcon && (
              <Icon
                name='close'
                size={14}
                className='popup--close'
                color='#555'
                onClick={this.handleClose.bind(this)}
              />
            )}
          </View>
        </Transition>
      </Block>
    )
  }
}

Popup.defaultProps = {
  onClose: () => {},
  isOpened: false,
  round: true,
  position: 'center',
  closeIcon: true
}

Popup.propTypes = {
  isOpened: PropTypes.bool,
  round: PropTypes.bool,
  closeIcon: PropTypes.bool,
  onClose: PropTypes.func
}

