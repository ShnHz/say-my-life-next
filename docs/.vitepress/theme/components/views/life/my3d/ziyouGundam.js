import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const loaderZiyouGundamModel = (scene) => {
  const fbxLoader = new FBXLoader()

  fbxLoader.load(
    'https://cdn.chenyingshuang.cn/3dmodel/3d66.com_11461907.max',
    function (object) {
      // 添加到场景中
      scene.add(object)
    }
  )
}

export { loaderZiyouGundamModel }
