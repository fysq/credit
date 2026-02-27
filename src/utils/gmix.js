import config from '../static/config.js'
export default {
  methods: {
    //裁剪
    imageFormat(src, width, height, host = 1, srcCut = 0) {
      if (src) {
        if (/https?:/.test(src) && srcCut == 0) return src;
        if (src.indexOf('?') > -1) {
          src = src.slice(0, src.indexOf('?'));
        }
        if (width && height) {
          src = src + `?x-oss-process=image/resize,m_fill,w_${width},h_${height}`;
        }
        if (host) {
          src = config.image_domain + src;
        }
      }
      return src;
    },
    timeRange(st, et) {
      if (st) {
        return st + ' 至 ' + et;
      } else {
        return `长期有效`;
      }
    }
  }
}
