/**
 * -------------------------------------------------------
 * 解析图片或视频文件url
 * @description 描述
 * -------------------------------------------------------
 */

export function getImgUrl(file: File): Promise<string> {
  return new Promise(resolve => {
    if (!window.FileReader) resolve('')

    const reader = new FileReader()
    reader.readAsDataURL(file)
    //文件读取结束    
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        resolve(`${e.target.result}`)
      } else {
        resolve('')
      }
    }
    // 文件读取失败
    reader.onerror = (err) => {
      console.log(err)
      resolve('')
    }
  })
}

export function getVideoUrl(file: File) {
  return URL.createObjectURL(file)
}