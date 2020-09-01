import React, { ReactElement, CSSProperties } from 'react'
import { Block } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { requestAnimationFrame, mergeStyle } from '_/utils/utils'

import './index.less'

const getClassNames = (name: string | undefined) => (`animate__animated animate__${name}`)

export interface TransitionProps {

  className?: string

  customStyle?: string | CSSProperties
  /**
   * 控制是否出现在页面上
   * @default false
   */
  isOpened: boolean

  /**
   * 显示动画类型
   * @default fadeIn
   */
  enterName?: string
  /**
   * 隐藏动画类型
   * @default fadeOut
   */
  leaveName?: string

  /**
   * 动画世界
   * @default 300
   */
  duration: number

  onBeforeEnter: Function

  onEnter: Function

  onBeforeLeave: Function

  onLeave: Function

  onAfterEnter: Function

  onAfterLeave: Function
}

export interface TransitionState {
  /**
   * 控制是否出现在页面上
   */
  _isOpened: boolean
  /**
   * 是否显示
   */
  display: boolean
  /**
   * class
   */
  currentClass: string[] | string
  /**
   * 动画时长
   */
  currentDuration: number
}

class Transition extends React.Component<TransitionProps, TransitionState> {
  public static defaultProps: TransitionProps
  public static propTypes: InferProps<TransitionProps>

  constructor (props) {
    super(props)
    this.state = {
      _isOpened: false,
      display: false,
      currentClass: '',
      currentDuration: 0
    }
  }

  status: string | undefined = undefined
  animationEnd: boolean | undefined = undefined

  public componentDidUpdate (prevProps: TransitionProps): void {
    if (prevProps.isOpened !== this.props.isOpened) {
      this.observeShow(this.props.isOpened, prevProps.isOpened)
    }
  }

  observeShow (value: boolean, old: boolean) {
    if (value === old) {
      return
    }
    value ? this.enter() : this.leave()
  }

  enter () {
    const { duration, enterName } = this.props
    const currentClass = getClassNames(enterName)
    this.status = 'enter'
    this.props.onBeforeEnter()
    requestAnimationFrame(() => {
      this.checkStatus('enter')
      this.props.onEnter()
      this.setState({
        _isOpened: true,
        display: true,
        currentClass: currentClass,
        currentDuration: duration
      })
      requestAnimationFrame(() => {
        this.checkStatus('enter')
        this.animationEnd = false
      })
    })
  }

  leave () {
    if (!this.state.display) {
      return
    }
    const { duration, leaveName } = this.props
    const currentClass = getClassNames(leaveName)
    this.status = 'leave'
    this.props.onBeforeLeave()
    requestAnimationFrame(() => {
      this.checkStatus('leave')
      this.props.onLeave()
      this.setState({
        currentClass: currentClass,
        currentDuration: duration
      })
      requestAnimationFrame(() => {
        this.checkStatus('leave')
        this.animationEnd = false
      })
    })
  }

  checkStatus (status: 'enter' | 'leave') {
    if (status !== this.status) {
      throw new Error(`incoherent status: ${status}`)
    }
  }

  onAnimationEnd () {
    if (this.animationEnd) return

    this.animationEnd = true

    if (this.status === 'enter') this.props.onAfterEnter()

    if (this.status === 'leave') this.props.onAfterLeave()

    this.setState({ currentClass: '' })

    const { isOpened } = this.props

    this.setState({ _isOpened: isOpened })
  }

  render () {
    const { _isOpened, currentClass, currentDuration } = this.state
    const { children, className, customStyle } = this.props
    if (!_isOpened) return <Block />
    const transitionStyle = {
      animationDuration: `${currentDuration}ms`
    }
    return (
      <Block>
        {React.Children.map([children], (child: ReactElement) => {
          return React.cloneElement(child, {
            className: classNames(
              currentClass,
              className,
              child.props.className
            ),
            style: mergeStyle(transitionStyle, customStyle || ''),
            onAnimationEnd: this.onAnimationEnd.bind(this)
          })
        })}
      </Block>
    )
  }
}

Transition.defaultProps = {
  isOpened: false,
  enterName: 'fadeIn',
  leaveName: 'fadeOut',
  duration: 300,
  onBeforeEnter: () => {},
  onEnter: () => {},
  onBeforeLeave: () => {},
  onLeave: () => {},
  onAfterEnter: () => {},
  onAfterLeave: () => {}
}

Transition.propTypes = {
  isOpened: PropTypes.bool,
  enterName: PropTypes.string,
  leaveName: PropTypes.string,
  duration: PropTypes.number,
  onBeforeEnter: PropTypes.func,
  onEnter: PropTypes.func,
  onBeforeLeave: PropTypes.func,
  onLeave: PropTypes.func,
  onAfterEnter: PropTypes.func,
  onAfterLeave: PropTypes.func
}

export default Transition
