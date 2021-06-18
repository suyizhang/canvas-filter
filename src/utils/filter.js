const photoFilter = {
  // 灰度滤镜
  hdlj: function (imgData) {
    let data = imgData.data;
    for (var i = 0; i < data.length; i += 4) {
      var grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = grey;
    }
    return imgData;
  },

  // 黑白滤镜
  hblj: function (imgData) {
    let data = imgData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg >= 125 ? 255 : 0;
    }
    return imgData;
  },

  // 反向滤镜
  fxlj: function (imgData) {
    let data = imgData.data;
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return imgData;
  },

  // 去色滤镜
  qslj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      let avg = Math.floor((Math.min(data[i], data[i + 1], data[i + 2]) + Math.max(data[i], data[i + 1], data[i + 2])) / 2);
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    return imgData;
  },

  // 单色滤镜
  dslj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      data[i * 4 + 2] = 0;
      data[i * 4 + 1] = 0;
    }
    return imgData;
  },

  // 怀旧滤镜
  hjlj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      let r = data[i * 4],
        g = data[i * 4 + 1],
        b = data[i * 4 + 2];
      let newR = 0.393 * r + 0.769 * g + 0.189 * b;
      let newG = 0.349 * r + 0.686 * g + 0.168 * b;
      let newB = 0.272 * r + 0.534 * g + 0.131 * b;
      let rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] = rgbArr;
    }
    return imgData;
  },

  // 熔铸滤镜
  rzlj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      let r = data[i * 4],
        g = data[i * 4 + 1],
        b = data[i * 4 + 2];
      let newR = (r * 128) / (g + b + 1);
      let newG = (g * 128) / (r + b + 1);
      let newB = (b * 128) / (g + r + 1);
      let rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? e * -1 : e > 255 ? 255 : e;
      });
      [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] = rgbArr;
    }
    return imgData;
  },

  // 冰冻滤镜
  bdlj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      let r = data[i * 4],
        g = data[i * 4 + 1],
        b = data[i * 4 + 2];
      let newR = ((r - g - b) * 3) / 2;
      let newG = ((g - r - b) * 3) / 2;
      let newB = ((b - g - r) * 3) / 2;
      let rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? e * -1 : e > 255 ? 255 : e;
      });
      [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] = rgbArr;
    }
    return imgData;
  },

  // 连环画滤镜
  lhhlj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      let r = data[i * 4],
        g = data[i * 4 + 1],
        b = data[i * 4 + 2];
      let newR = (Math.abs(g - b + g + r) * r) / 256;
      let newG = (Math.abs(b - g + b + r) * r) / 256;
      let newB = (Math.abs(b - g + b + r) * g) / 256;
      let rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] = rgbArr;
    }
    return imgData;
  },

  // 暗调滤镜
  adlj: function (imgData) {
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      let r = data[i * 4],
        g = data[i * 4 + 1],
        b = data[i * 4 + 2];
      let newR = (r * r) / 255;
      let newG = (g * g) / 255;
      let newB = (b * b) / 255;
      let rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]] = rgbArr;
    }
    return imgData;
  },

  gsmmlj: function (imgData, radius = 5, sigma = radius / 3) {
    let handleEdge = (i, x, w) => {
      var m = x + i;
      if (m < 0) {
        m = -m;
      } else if (m >= w) {
        m = w + i - x;
      }
      return m;
    };

    var pixes = imgData.data,
      height = imgData.height,
      width = imgData.width;
    var gaussEdge = radius * 2 + 1;
    var gaussMatrix = [],
      gaussSum = 0,
      a = 1 / (2 * sigma * sigma * Math.PI),
      b = -a * Math.PI;

    for (var i = -radius; i <= radius; i++) {
      for (var j = -radius; j <= radius; j++) {
        var gxy = a * Math.exp((i * i + j * j) * b);
        gaussMatrix.push(gxy);
        gaussSum += gxy;
      }
    }
    var gaussNum = (radius + 1) * (radius + 1);
    for (let i = 0; i < gaussNum; i++) {
      gaussMatrix[i] /= gaussSum;
    }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let i = -radius; i <= radius; i++) {
          let m = handleEdge(i, x, width);
          for (let j = -radius; j <= radius; j++) {
            let mm = handleEdge(j, y, height);
            let currentPixId = (mm * width + m) * 4;
            let jj = j + radius;
            let ii = i + radius;
            r += pixes[currentPixId] * gaussMatrix[jj * gaussEdge + ii];
            g += pixes[currentPixId + 1] * gaussMatrix[jj * gaussEdge + ii];
            b += pixes[currentPixId + 2] * gaussMatrix[jj * gaussEdge + ii];
          }
        }
        let pixId = (y * width + x) * 4;
        pixes[pixId] = ~~r;
        pixes[pixId + 1] = ~~g;
        pixes[pixId + 2] = ~~b;
      }
    }
    return imgData;
  },
};

export default photoFilter;
