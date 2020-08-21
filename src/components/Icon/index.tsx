import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { CommonEventFunction, Text } from '@tarojs/components'
import { pxTransform, objectToString } from '_/utils/utils'

import './index.less'

interface IconProps {
  className?: string
  customStyle?: string | CSSProperties
  name: string
  color?: string
  prefixClass?: string
  size?: number | string
  onClick?: CommonEventFunction
}

class Icon extends React.Component<IconProps, any> {
  public static defaultProps: IconProps
  public static propTypes: InferProps<IconProps>

  /**
   * 合并 style
   * @param {Object|String} style1
   * @param {Object|String} style2
   * @returns {String}
   */
  mergeStyle (
    style1: object | string,
    style2: object | string
  ): object | string {
    if (
      style1 &&
      typeof style1 === 'object' &&
      style2 &&
      typeof style2 === 'object'
    ) {
      return Object.assign({}, style1, style2)
    }
    return objectToString(style1) + objectToString(style2)
  }

  private handleClick (): void {
    this.props.onClick && this.props.onClick(arguments as any)
  }

  render (): JSX.Element {
    const {
      customStyle,
      className,
      prefixClass,
      name,
      size,
      color
    } = this.props
    const rootStyle = {
      fontSize: `${pxTransform(parseInt(String(size)) * 2)}`,
      color
    }
    const iconName = name ? `${prefixClass}-${name}` : ''
    return (
      <Text
        className={classNames(prefixClass, iconName, className)}
        style={this.mergeStyle(rootStyle, customStyle as Object)}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}

Icon.defaultProps = {
  customStyle: '',
  className: '',
  prefixClass: 'icon',
  name: '',
  color: '',
  size: 24
}

Icon.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prefixClass: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func
}

export default Icon
