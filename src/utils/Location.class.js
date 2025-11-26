import coordtransform from '../libs/coordtransform'


class Location{
  constructor(){
    this.location$ = null;
    this._cache = {};
    return this;
  }
  static getInstance(){
    if(!this.instance){
      this.instance = new Location();
    }
    return this.instance;
  }
  static openLocation(params){
    const { latitude,longitude,name = '',address = '' } = params;
    const [ lng,lat ] = Location.convert('bd09togcj02',longitude,latitude);
    params = {
      longitude : lng,
      latitude : lat,
      address,
      name
    };
    return uni.openLocation(params)
  }
  get({ cache = false } = {}){
    if(!cache){
      this.location$ = this._createLocation$();
    }
    return this.location$;
  }
  static convert(type,lng,lat){
    return coordtransform[type](lng,lat);
  }
  _getLocation(){
    return new Promise((resolve,reject) => {
      uni.getLocation({
        type : 'gcj02',
        success : res => {
          this._cache = res;
          resolve(res);
        },
        fail : () => {
          resolve(this._cache);
          //这个跟地理位置校验不一样，还是需要自己判断
          //reject();
        }
      })
    })
  }
  _createLocation$(){
    return this._getLocation();
  }
}

export default Location;
