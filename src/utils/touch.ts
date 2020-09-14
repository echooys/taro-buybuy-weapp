export class Touch {
  constructor () {
  }

  startX: number = 0
  startY: number = 0

  _touchstart (e, items) {
    //开始触摸时 重置所有删除
    items.forEach(function (v) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false
    })

    this.startX = e.changedTouches[0].clientX
    this.startY = e.changedTouches[0].clientY

    return items
  }

  _touchmove (e, items, index) {
    console.log(e)
    let touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this._angle({
        X: this.startX,
        Y: this.startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      })
    items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return
      console.log(i, index)
      if (i == index) {
        if (touchMoveX > this.startX) {
          //右滑
          v.isTouchMove = false
        } else {
          //左滑
          v.isTouchMove = true
        }
      }
    })
    return items
  }

  _angle (start, end) {
    let _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  }
}
