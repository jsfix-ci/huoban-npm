import HuoBan from './HuoBan'

export default {
  upload: (callback, $filePath, $fileName, type = 'attachment') => {
    HuoBan.post(callback, '/file', { 'source': filePath, 'name': fileName, 'type': type }, { 'upload': TRUE })
  }
}
