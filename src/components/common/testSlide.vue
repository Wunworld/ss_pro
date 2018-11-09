<template>
  <div class="testSlider">
    <div class="drag" @mousemove.prevent="mousemoveFn($event)" @mouseup.prevent="mouseupFn($event)">
      <div class="drag_bg"></div>
      <div class="drag_text">{{testContent}}</div>
      <!-- <div class="handler handler_bg"></div> -->
      <div @mousedown="mousedownFn($event)" class="handler handler_bg"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'testSlider',
  data () {
    return {
      // 初始化状态
      testContent: '请按住滑块，拖动到最右边',
      beginClientX: 0,
      // 距离屏幕左端距离*/
      mouseMoveStata: false,
      // 触发拖动状态 判断*/
      maxwidth: 299,
      // 拖动最大宽度，依据滑块宽度算出来的*/
      confirmWords: '拖动滑块验证',
      // 滑块文字*/
      confirmSuccess: false // 验证成功判断
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    mousemoveFn (e) {
      if (this.confirmSuccess) {
        return;
      }
      if (this.mouseMoveStata) {
        var width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          $('.handler').css({'left': width});
          $('.drag_bg').css({'width': width});
        } else if (width > this.maxwidth) {
          this.successFu();
        }
      }
    },
    mousedownFn (e) {
      this.mouseMoveStata = true;
      this.beginClientX = e.clientX;
      // this.confirmSuccess = false;
    },
    mouseupFn (e) {
      console.log(this.confirmSuccess);
      if (this.confirmSuccess) {
        return;
      }
      this.mouseMoveStata = false;
      var width = e.clientX - this.beginClientX
      if (width < this.maxwidth) {
        console.log(1122);
        $('.handler').css({'left': 0});
        $('.drag_bg').css({'width': 0});
      }
    },
    successFu () {
      $('.handler').removeClass('handler_bg').addClass('handler_ok_bg');
      this.testContent = '验证通过';
      $('.drag').css({'color': '#fff'});
      $('.drag').css({'background-color': '#13CE66'});
      $('.handler').css({'left': this.maxwidth});
      $('.drag_bg').css({'width': this.maxwidth});
      $('body').unbind('mousemove');
      $('body').unbind('mouseup');
      this.confirmSuccess = true;
      this.mouseMoveStata = false;
      this.initState = false;
      this.$emit('testOK', 'OK');
      // console.log(this.beginClientX, this.mouseMoveStata, this.maxwidth, this.confirmSuccess);
      // 还原初始状态
      // let that = this;
      // setTimeout(function () {
      //   console.log(22);
      //   that.slideOrigin();
      // }, 600000)
      // console.log(this.beginClientX, this.mouseMoveStata, this.maxwidth, this.confirmSuccess);
    },
    slideOrigin () {
      this.mouseMoveStata = true;
      this.confirmSuccess = false;
      $('.handler').css({'left': 0});
      $('.drag_bg').css({'width': 0});
      $('.handler').removeClass('handler_ok_bg').addClass('handler_bg');
      this.testContent = '请按住滑块，拖动到最右边';
      $('.drag').css({'color': '#333'});
      $('.drag').css({'background-color': '#e8e8e8'});
      console.log(11111);
      console.log(this.confirmSuccess);
    }
  }
}
</script>

<style>
.drag {
  /* border-radius:30px; */
  position: relative;
  background-color: #e8e8e8;
  width: 345px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.handler {
  /* border-radius:30px; */
  position: absolute;
  top: 0px;
  left: 0px;
  width: 44px;
  height: 38px;
  border: 1px solid #ccc;
  cursor: move;
}
.handler_bg {
  background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==') no-repeat center;
}
.handler_ok_bg {
  background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
}
.drag_bg {
  /* border-radius:30px; */
  background-color: #13CE66;
  height: 40px;
  width: 0px;
}
.drag_text {
  font-size: 14px;
  position: absolute;
  top: 0px;
  width: 345px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
</style>
