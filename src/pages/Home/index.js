import React, { useState, useLayoutEffect, useRef } from 'react';
import CanvasRect from '../../utils/draw';
import photoFilter from '../../utils/filter';

import img from '../../static/img/4a5e48e736d12f2ef27d70b84fc2d56284356824.jpg';

import './index.less';

const buttonList = [
  { text: '正常', code: 'normal' },
  { text: '灰度滤镜', code: 'hdlj' },
  { text: '黑白滤镜', code: 'hblj' },
  { text: '反向滤镜', code: 'fxlj' },
  { text: '去色滤镜', code: 'qslj' },
  { text: '单色滤镜', code: 'dslj' },
  { text: '怀旧滤镜', code: 'hjlj' },
  { text: '熔铸滤镜', code: 'rzlj' },
  { text: '冰冻滤镜', code: 'bdlj' },
  { text: '连环画滤镜', code: 'lhhlj' },
  { text: '暗调滤镜', code: 'adlj' },
  { text: '高斯模糊滤镜', code: 'gsmmlj' },
];

function Home() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [type, setType] = useState(-1);

  const imageLoad = () => {
    const width = imgRef.current.width;
    const height = imgRef.current.height;
    setSize({ width, height });
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    queryImageData();
  };

  useLayoutEffect(() => {
    const { width, height } = size;
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(imgRef.current, 0, 0, imgRef.current.naturalWidth, imgRef.current.naturalHeight, 0, 0, width, height);
  }, [size]);

  const frameCanvas = () => {
    const img = imgRef.current;
    const width = img.width;
    const height = img.height;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    return [canvas, context, width, height, naturalWidth, naturalHeight];
  };

  const queryImageData = () => {
    const img = imgRef.current;
    const [, context, width, height, naturalWidth, naturalHeight] = frameCanvas();
    context.drawImage(img, 0, 0, naturalWidth, naturalHeight, 0, 0, width, height);
    const imgData = context.getImageData(0, 0, width, height);
    return imgData;
  };

  const change = async (type) => {
    const { width, height } = size;
    await setType(type);
    const func = photoFilter[type];
    const baseImageData = queryImageData();
    const imageData = func ? func(baseImageData) : baseImageData;
    const img = filterImage(imageData);
    const ctx = canvasRef.current.getContext('2d');
    new CanvasRect(img, ctx);
    ctx.clearRect(0, 0, width, height);
  };

  const filterImage = (imageData) => {
    const [canvas, context] = frameCanvas();
    context.putImageData(imageData, 0, 0);
    const src = canvas.toDataURL();
    return src;
  };

  return (
    <div className='home-view'>
      <div className='home-content'>
        <div className='content'>
          <img onLoad={imageLoad} ref={imgRef} src={img} alt='little' />
        </div>
        <div className='content'>
          <canvas ref={canvasRef} id='canvas' />
        </div>
      </div>
      <div className='home-footer'>
        {buttonList.map((v) => {
          return (
            <div key={v.code} onClick={() => change(v.code)} className={`footer-button ${v.code === type ? 'active' : ''}`}>
              {v.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
